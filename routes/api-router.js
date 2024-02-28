const { getEndpoints } = require('../controllers/api.controllers')
const auctionRouter = require('./auctions-router')
const businessRouter = require('./businesses-router')
const eventRouter = require('./events-router')
const userRouter = require('./users-router')

const apiRouter = require('express').Router()

apiRouter.get('/', getEndpoints)
apiRouter.use('/businesses', businessRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/auctions', auctionRouter)
apiRouter.use('/events', eventRouter)

module.exports = apiRouter
