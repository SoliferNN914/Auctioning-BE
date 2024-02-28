const {
  patchSeatingById,
  getEventById,
  getEventsByBusinessId,
  getEventsByUserId,
  postEvent,
} = require('../controllers/events.controllers')

const eventRouter = require('express').Router()

eventRouter.post('/', postEvent)
eventRouter.get('/:event_id', getEventById)
eventRouter.patch('/seating/:event_id', patchSeatingById)
eventRouter.get('/near/:user_id', getEventsByUserId)
eventRouter.get('/business/:business_id', getEventsByBusinessId)

module.exports = eventRouter
