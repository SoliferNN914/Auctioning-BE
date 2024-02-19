// const {
//   getUsers,
//   patchUsers,
//   getUsersById,
//   getInfo,
// } = require('./controllers/test-data-controllers')

const { getEndpoints } = require('./controllers/api.controllers')

const express = require('express')

const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/api', getEndpoints)

// app.get('/api/users', getUsers)
// app.get('/api/users/:user_id', getUsersById)
// app.patch('/api/users/:user_id', patchUsers)

// app.get('/api/events', )

module.exports = app
