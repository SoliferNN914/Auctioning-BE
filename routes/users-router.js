const {
  getAllUsers,
  getUserById,
  editUserById,
  postNewUser,
  patchUserBiddingStatus,
} = require('../controllers/users.controllers')
const userRouter = require('express').Router()

userRouter.route('/').get(getAllUsers).post(postNewUser)
userRouter.route('/:user_id').get(getUserById).patch(editUserById)
userRouter.patch('/:user_id/bidding', patchUserBiddingStatus)

module.exports = userRouter
