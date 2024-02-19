const { getEndpoints } = require('./controllers/api.controllers')
const {
  getAllBusinesses,
  getBusinessById,
} = require('./controllers/businesses.controllers')
const { getAllUsers } = require('./controllers/users.controllers')

const express = require('express')

const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/businesses', getAllBusinesses)
app.get('/api/businesses/:business_id', getBusinessById)

app.get('/api/users', getAllUsers)

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Invalid path" });
});

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

module.exports = app
