const { fetchAllUsers, fetchUserById } = require('../models/users.models')

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