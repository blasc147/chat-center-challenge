import { useEffect, useState, useCallback } from 'react'
import io from 'socket.io-client'
import useSound from 'use-sound'
import config from '../config'
import initialMessage from '../common/constants/initialCarolMessage'
import axios from 'axios'

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket']
})

const initialCarolMessage = {
  user: 'bot',
  message: initialMessage,
  id: Date.now()
}

export default function useChat(selectedUser) {
  const [playSend] = useSound(config.SEND_AUDIO_URL)
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [botTyping, setBotTyping] = useState(false)

  useEffect(() => {
    if (selectedUser) {
      async function fetchMessages() {
        const response = await axios.get(
          `${config.BOT_SERVER_ENDPOINT}/api/chats/${selectedUser}`
        )
        setMessages(response.data.messages)
      }
      fetchMessages()
    }
  }, [selectedUser])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server')
    })

    socket.on('bot-message', (botMessage) => {
      console.log('Received bot message:', botMessage)
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'bot', message: botMessage, id: Date.now() }
      ])
      setBotTyping(false)
      playReceive()
    })

    socket.on('bot-typing', () => {
      console.log('Bot is typing')
      setBotTyping(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from the server')
    })

    return () => {
      socket.off('connect')
      socket.off('bot-message')
      socket.off('bot-typing')
      socket.off('disconnect')
    }
  }, [playReceive])

  const sendMessage = useCallback(() => {
    if (message.trim()) {
      const userMessage = {
        user: 'me',
        message: message.trim(),
        id: Date.now()
      }
      console.log('Sending user message:', userMessage)
      setMessages((prevMessages) => [...prevMessages, userMessage])
      setMessage('')
      playSend()

      socket.emit('user-message', message.trim())
    }
  }, [message, playSend])

  const onChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    const messageList = document.getElementById('message-list')
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight
    }
  }, [messages])

  return {
    messages,
    message,
    botTyping,
    sendMessage,
    onChangeMessage
  }
}
