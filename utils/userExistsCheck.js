const db = require('../db/connection')

exports.checkUserExists = (username) => {
  return db
    .query(`SELECT * FROM users WHERE users.username = $1`, [username])
    .then(({ rows }) => {
      if (rows.length !== 0) {
        return Promise.reject({ status: 400, msg: 'User Already Exists' })
      }
    })
}
