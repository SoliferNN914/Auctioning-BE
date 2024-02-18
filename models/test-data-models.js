const db = require('../db/connection')

exports.selectUsers = () => {
  const query = 'SELECT * FROM users'
  return db.query(query).then(({ rows }) => rows)
}

exports.selectUsersById = (user_id) =>
  db
    .query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
    .then(({ rows }) => rows[0])

exports.updateUser = ({ username, user_id }) =>
  db
    .query(`UPDATE users SET username = $1 WHERE user_id = $2 RETURNING *;`, [
      username,
      user_id,
    ])
    .then(({ rows }) => rows[0])
