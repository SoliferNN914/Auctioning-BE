const db = require('../db/connection')
const postcodes = require('node-postcodes.io')
const { checkExists } = require('../utils/check-exists')

exports.fetchAllUsers = () => {
  return db.query(`SELECT * FROM users`).then((users) => {
    return users.rows
  })
}

exports.fetchUserById = (user_id) => {

  return db.query(`SELECT * FROM users WHERE users.user_id = $1`, [
    user_id,
  ])
  .then((user) => {
    if (!user.rows.length) {
      return Promise.reject({ status: 404, msg: 'ID not found' })
    }
    return user.rows[0]
  })
}

exports.changeUserById = (user_id, device_token) => {
  if (typeof device_token !== 'string' || device_token === '') {
    return Promise.reject({ status: 400, msg: 'Bad request' })
  }
  return db.query(`UPDATE users SET device_token = $1 WHERE user_id = $2 RETURNING *`, [device_token, user_id]).then((updatedUser) => {
    if (updatedUser.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'Bad request' })
    }
    return updatedUser.rows[0]
  })
}

exports.addNewUser = (body, userPostcode) => {
  if (body.username === '' || body.postcode === '') {
    return Promise.reject({ status: 400, msg: 'Bad request' })
  }
  return postcodes
    .lookup(userPostcode)
    .then((result) => {
      const longitude = result.result.longitude
      const latitude = result.result.latitude
      const longlat = `${longitude}, ${latitude}`
      return longlat
    })
    .then((longlat) => {
      return db.query(
        `INSERT INTO users (username, postcode, coords, device_token) VALUES ($1, $2, $3, $4) RETURNING *`,
        [body.username, body.postcode, longlat, body.device_token]
      )
    })
    .then((user) => {
      return user.rows[0]
    })
}

exports.updateUserBiddingStatus = (user_id) => {
  return checkExists('users', 'user_id', user_id, 'User')
    .then(() => {
      return db.query(
        `UPDATE users SET currently_bidding = NOT currently_bidding WHERE user_id = $1 RETURNING *`,
        [user_id]
      )
    })
    .then(({ rows }) => {
      return rows[0]
    })
}
