const {
  fetchAllBusinesses,
  fetchBusinessById,
  insertBusiness,
} = require('../models/businesses.models')

exports.getAllBusinesses = (req, res, next) => {
  fetchAllBusinesses()
    .then((businesses) => {
      res.status(200).send({ businesses })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getBusinessById = (req, res, next) => {
  const { business_id } = req.params
  fetchBusinessById(business_id)
    .then((business) => {
      res.status(200).send({ business })
    })
    .catch((err) => {
      next(err)
    })
}

exports.postBusiness = (req, res, next) => {
  const new_business = req.body
  insertBusiness(new_business)
    .then((business) => {
      res.status(201).send({ business })
    })
    .catch((err) => {
      next(err)
    })
}