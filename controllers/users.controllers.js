const { fetchAllUsers, fetchUserById, changeUserById } = require('../models/users.models')

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
  const {user_id} = req.params
  fetchUserById(user_id).then((user) => {
    res.status(200).send({user})
  })
  .catch((err) => {
    next(err)
  })
}

exports.editUserById = (req, res, next) => {
  const { user_id } = req.params
  const { device_token } = req.body
  changeUserById(user_id, device_token).then((updatedUser) => {
    res.status(200).send({updatedUser})
  })
  .catch((err) => {
    console.log(err)
    next(err)
  })
}