const { fetchEndpoints } = require('../models/api.models')

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints()
    .then((endpointObject) => {
      res.status(200).send({ endpointObject })
    })
    .catch((err) => {
      next(err)
    })
}
