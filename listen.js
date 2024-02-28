const app = require('./app.js')

const { PORT = 9090 } = process.env

const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)
  socket.on('new bid', (bidData) => {
    io.emit('new bid', bidData)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
const server = http.listen(PORT, () => {
  const { port } = server.address()
  console.log(`Listening on port ${port}`)
})
