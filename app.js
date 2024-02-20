const { getEndpoints } = require('./controllers/api.controllers')
const {
  getAllBusinesses,
  getBusinessById,
} = require('./controllers/businesses.controllers')

const { getAuctionsById } = require('./controllers/auctions.controllers')

const {
  getAllUsers,
  getUserById,
  postNewUser,
} = require('./controllers/users.controllers')

const {
  patchSeatingById,
  getEventById,
} = require('./controllers/events.controllers')

const express = require('express')

const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/api/', getEndpoints)

app.get('/api/businesses', getAllBusinesses)
app.get('/api/businesses/:business_id', getBusinessById)

app.get('/api/users', getAllUsers)
app.get('/api/users/:user_id', getUserById)
app.post('/api/users', postNewUser)

app.get('/api/auctions/:event_id', getAuctionsById)
app.patch('/api/events/seating/:event_id', patchSeatingById)

app.get('/api/events/:event_id', getEventById)

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'Invalid path' })
})

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'Invalid path' })
})

app.use((err, req, res, next) => {
  if (err.msg && err.status ) {
    res.status(err.status).send({ msg: err.msg })
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg })
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.code === '22P02' || '23503' || '23502') {
    res.status(400).send({ msg: 'Bad request' })
  }
})

// app.use((err, req, res, next) => {
//   if(err.code === '23505'){
//       res.status(400).send(({msg: err.detail}))
//   } else {
//       next (err)
//   }
// })

module.exports = app
