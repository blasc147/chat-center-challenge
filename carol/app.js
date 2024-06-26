const express = require('express')
const cors = require('cors')

// Utils
const {
  getRandomDelay,
  getBotResponse,
  parseResponseDataset
} = require('./utils')
const chats = require('./chats')
// Constants
const {
  PORT,
  RESPONSES_FILE_PATH,
  USER_MESSAGE_EVENT,
  BOT_MESSAGE_EVENT,
  BOT_TYPING_EVENT,
  MIN_TYPING_S,
  MAX_TYPING_S,
  MIN_NATURAL_PAUSE_S,
  MAX_NATURAL_PAUSE_S
} = require('./constants')

const app = express()
const http = require('http').createServer(app)
const router = express.Router()
const io = require('socket.io')(http)

let botResponses = null

app.use(router)
app.use(cors({ origin: '*' }))
app.use(express.static(__dirname + '/public'))

// Endpoint para obtener la lista de chats
app.get('/api/chats', (req, res) => {
  res.json(chats)
})

// Endpoint para obtener los mensajes de un chat específico
app.get('/api/chats/:id', (req, res) => {
  const chat = chats.find((c) => c.id === req.params.id)
  if (chat) {
    res.json(chat)
  } else {
    res.status(404).send('Chat not found')
  }
})
io.on('connection', (socket) => {
  socket.on(USER_MESSAGE_EVENT, (message) => {
    setTimeout(() => {
      if (MAX_TYPING_S) {
        socket.emit(BOT_TYPING_EVENT)
      }

      setTimeout(() => {
        socket.emit(BOT_MESSAGE_EVENT, getBotResponse(message, botResponses))
      }, getRandomDelay(MIN_TYPING_S, MAX_TYPING_S))
    }, getRandomDelay(MIN_NATURAL_PAUSE_S, MAX_NATURAL_PAUSE_S))
  })
})

parseResponseDataset(RESPONSES_FILE_PATH).then((parsedResponses) => {
  botResponses = parsedResponses
})

http.listen(PORT, () => {
  console.log(`Carol server listening on *:${PORT} 🚀`)
})
