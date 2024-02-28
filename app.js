const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require('./routes/api-router')

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'Invalid path' })
})

app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg })
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
