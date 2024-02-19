const {
  getUsers,
  patchUsers,
  getUsersById,
  getInfo
} = require('./controllers/test-data-controllers')

const express = require('express')

const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/api/users', getUsers)
app.get('/api/users/:user_id', getUsersById)
app.patch('/api/users/:user_id', patchUsers)
app.get('/api', getInfo)
app.get('/api/events', )

module.exports = app
