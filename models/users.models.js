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