const chats = [
  {
    id: '1', // Asegúrate de que este ID es '1'
    name: 'Carol',
    userId: 'bot',
    icon: 'fas fa-comment-dots',
    isOnline: true,
    color: '#4DB8EF',
    messages: [
      { user: 'bot', message: 'Hello! How can I help you today?', id: 1 },
      { user: 'me', message: 'I need assistance with my account.', id: 2 }
    ]
  },
  {
    id: '2',
    name: 'Brandon Andrews',
    userId: 'brandon',
    isOnline: false,
    lastActive: '3 hours ago',
    color: '#DD95BA',
    lastMessage: 'Hello there!',
    messages: [
      { user: 'brandon', message: 'Hello there!', id: 1 },
      { user: 'me', message: 'Hi Brandon!', id: 2 }
    ]
  }
  // Agrega más chats aquí
]

module.exports = chats
