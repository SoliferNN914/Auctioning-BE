const { updateSeatingById, fetchEventById } = require('../models/events.models')

exports.patchSeatingById = (req, res, next) => {
  const { event_id } = req.params
  const { seats_sold } = req.body
  updateSeatingById(seats_sold, event_id)
    .then((event) => {
      res.status(200).send({ event })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getEventById = (req, res, next) => {
  const { event_id } = req.params
  fetchEventById(event_id)
    .then((event) => {
      res.status(200).send({ event })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getEventsByBusinessId = (req, res, next) => {
  const { business_id } = req.params
  const { active } = req.query
  selectEventsByBusinessId(active, business_id)
  .then((events) => {
    res.status(200).send({ events })
  })
    .catch((err) => {
      next(err)
    })
}
