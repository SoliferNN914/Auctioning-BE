const db = require('../db/connection')

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
    console.log('should be in here')
    return Promise.reject({ status: 400, msg: 'Bad request' })
  }
  return db.query(`UPDATE users SET device_token = $1 WHERE user_id = $2 RETURNING *`, [device_token, user_id]).then((updatedUser) => {
    if (updatedUser.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'Bad request' })
    }
    return updatedUser.rows[0]
  })
}