const db = require("../db/connection");

exports.selectUsers = () => {
  const query = "SELECT * FROM users";
  return db.query(query).then(({ rows }) => {
    return rows;
  });
};

exports.insertUser = (user) => {
  const { username, profile_url } = user;
  return db
    .query(
      `INSERT INTO users (username, profile_url) VALUES ($1, $2) RETURNING *;`,
      [username, profile_url]
    )
    .then(({ rows }) => {
      return rows;
    });
};
