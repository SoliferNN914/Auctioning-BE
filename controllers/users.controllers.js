const {
  fetchAllUsers,
  fetchUserById,
  changeUserById,
  addNewUser,
  updateUserBiddingStatus,
} = require('../models/users.models')
const { checkUserExists } = require('../utils/userExistsCheck')

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
  const username = body.username
  const addUser = addNewUser(body, userPostcode)
  const checkUser = checkUserExists(username)
  const promises = [addUser]
  if (username) {
    promises.push(checkUser)
  }
  Promise.all(promises)
    .then((response) => {
      const user = response[0]
      res.status(201).send({ user })
    })
    .catch((err) => {
      next(err)
    })
}

exports.patchUserBiddingStatus = (req, res, next) => {
  const { user_id } = req.params
  updateUserBiddingStatus(user_id)
    .then((user) => {
      res.status(200).send({ user })
    })
    .catch((err) => {
      next(err)
    })
}

exports.editUserById = (req, res, next) => {
  const { user_id } = req.params
  const { device_token } = req.body
  changeUserById(user_id, device_token)
    .then((updatedUser) => {
      res.status(200).send({ updatedUser })
    })
    .catch((err) => {
      next(err)
    })
}
