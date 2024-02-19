const {
  fetchAllUsers,
  fetchUserById,
  addNewUser,
} = require('../models/users.models')
const postcodes = require('node-postcodes.io')

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getUserById = (req, res, next) => {
  const { user_id } = req.params
  fetchUserById(user_id)
    .then((user) => {
      res.status(200).send({ user })
    })
    .catch((err) => {
      next(err)
    })
}

exports.postNewUser = (req, res, next) => {
  const { body } = req
  const userPostcode = body.postcode
  addNewUser(body, userPostcode)
    .then((user) => {
      res.status(201).send({ user })
    })
    .catch((err) => {
      next(err)
    })
}
