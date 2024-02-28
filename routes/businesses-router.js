const {
  getAllBusinesses,
  getBusinessById,
  postBusiness,
} = require('../controllers/businesses.controllers')
const businessRouter = require('express').Router()

businessRouter.route('/').get(getAllBusinesses).post(postBusiness)
businessRouter.get('/:business_id', getBusinessById)

module.exports = businessRouter
