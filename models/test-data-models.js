const db = require("../db/connection");

exports.selectUsers = () => {
  const query = "SELECT * FROM users";
  return db.query(query).then(({ rows }) => {
    return rows;
  });
};

exports.selectUsersById = (user_id) => {
  return db.query(
    `SELECT * FROM users WHERE user_id = $1`, [user_id]
  )
  .then(({ rows }) => {
    return rows[0];
  });
}


exports.updateUser = ({ username, user_id }) => {
  return db.query(
      `UPDATE users SET username = $1 WHERE user_id = $2 RETURNING *;`,
      [username, user_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

exports.updateBidding = ({ price, item_id }) => {
  return db.query(
    `UPDATE bidding SET price = $1 WHERE item_id = $2 RETURNING *;`,
    [price, item_id]
  )
  .then(({ rows }) => {
    return rows[0];
  });
}

exports.selectBidById = (item_id) => {
  console.log(item_id);
  return db.query(
    `SELECT * FROM bidding WHERE item_id = $1`, [item_id]
  )
  .then(({ rows }) => {
    return rows[0];
  });
}

