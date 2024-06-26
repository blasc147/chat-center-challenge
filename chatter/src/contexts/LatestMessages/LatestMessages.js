import React, { useState, createContext, useCallback } from 'react'
import initialMessages from './constants/initialMessages'

const LatestMessagesContext = createContext({})

export default LatestMessagesContext

export function LatestMessages({ children }) {
  const [messages, setMessages] = useState(initialMessages)
  const setLatestMessage = useCallback((userId, value) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [userId]: value.message
    }))
  }, [])
  return (
    <LatestMessagesContext.Provider value={{ messages, setLatestMessage }}>
      {children}
    </LatestMessagesContext.Provider>
  )
}
