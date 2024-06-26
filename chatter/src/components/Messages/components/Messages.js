import React from 'react'
import TypingMessage from './TypingMessage'
import Header from './Header'
import Footer from './Footer'
import Message from './Message'
import useChat from '../../../hooks/useChat'
import '../styles/_messages.scss'

function Messages({ selectedUser }) {
  const { messages, message, botTyping, sendMessage, onChangeMessage } =
    useChat(selectedUser)

  return (
    <div className='messages'>
      <Header user={selectedUser} />
      <div className='messages__list' id='message-list'>
        {messages.map((msg, index) => (
          <Message
            key={msg.id}
            message={msg}
            nextMessage={messages[index + 1]}
            botTyping={botTyping}
          />
        ))}
        {botTyping && <TypingMessage />}
      </div>
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  )
}

export default Messages
