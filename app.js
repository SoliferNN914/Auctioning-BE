const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require('./routes/api-router')
const errors = require('./errors')

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)
app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'Invalid path' })
})

// Error Handling
app.use(errors.handleCustomErrors)
app.use(errors.handlePsqlErrors)
app.use(errors.handleServerErrors)

module.exports = app
