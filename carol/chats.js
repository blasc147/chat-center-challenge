const chats = [
  {
    id: '1',
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
  },
  {
    id: '3',
    name: 'Clayton Day',
    userId: 'clayton',
    isOnline: false,
    lastActive: 'Yesterday',
    color: '#62D5D1',
    lastMessage: 'Yes of course. Thanks',
    messages: [
      { user: 'clayton', message: 'Yes of course. Thanks', id: 1 },
      { user: 'me', message: 'You are welcome!', id: 2 }
    ]
  },
  {
    id: '4',
    name: 'Bernice Clark',
    userId: 'bernice',
    isOnline: true,
    color: '#82D39F',
    lastMessage: 'This is a question regarding the fun time we had.',
    messages: [
      {
        user: 'bernice',
        message: 'This is a question regarding the fun time we had.',
        id: 1
      },
      { user: 'me', message: 'Sure, what do you want to know?', id: 2 }
    ]
  },
  {
    id: '5',
    name: 'Christine Fields',
    userId: 'christine',
    isOnline: true,
    lastActive: 'Jul 28',
    color: '#FFBB75',
    lastMessage: 'Do you need help with the price?',
    messages: [
      { user: 'christine', message: 'Do you need help with the price?', id: 1 },
      { user: 'me', message: 'Yes, that would be great!', id: 2 }
    ]
  }
]

module.exports = chats
