import { useEffect, useState, useCallback, useContext } from 'react'
import io from 'socket.io-client'
import useSound from 'use-sound'
import config from '../config'
import LatestMessagesContext from '../contexts/LatestMessages'
import axios from 'axios'

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket']
})

export default function useChat(selectedUser) {
  const [playSend] = useSound(config.SEND_AUDIO_URL)
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [botTyping, setBotTyping] = useState(false)
  const { setLatestMessage } = useContext(LatestMessagesContext)

  useEffect(() => {
    if (selectedUser.id) {
      async function fetchMessages() {
        const response = await axios.get(
          `${config.BOT_SERVER_ENDPOINT}/api/chats/${selectedUser.id}`
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
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'bot', message: botMessage, id: Date.now() }
      ])
      setLatestMessage(selectedUser.userId, {
        user: 'bot',
        message: botMessage
      })
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
  }, [playReceive, selectedUser, setLatestMessage])

  const sendMessage = useCallback(() => {
    if (message.trim()) {
      const userMessage = {
        user: 'me',
        message: message.trim(),
        id: Date.now()
      }
      console.log('Sending user message:', userMessage)
      setMessages((prevMessages) => [...prevMessages, userMessage])
      setLatestMessage('me', userMessage)
      setMessage('')
      playSend()

      socket.emit('user-message', message.trim())
    }
  }, [message, playSend, setLatestMessage])

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
