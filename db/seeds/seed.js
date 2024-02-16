
const format = require("pg-format");
const db = require("../connection");

function seed({userData}) {
  return db
    .query("DROP TABLE IF EXISTS users;")
    .query("DROP TABLE IF EXISTS bidding")
    .then(() => {
      return db.query(`
        CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(40) NOT NULL,
        profile_url VARCHAR(350) NOT NULL
        )`);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (username, profile_url) VALUES %L;",
        userData.map(({ username, profile_url }) => [
          username,
          profile_url,
        ])
      );
      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE bidding (
        username VARCHAR(40) NOT NULL,
        )`);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO bidding (username, profile_url) VALUES %L;",
        userData.map(({ username, profile_url }) => [
          username,
          profile_url,
        ])
      );
      return db.query(insertUsersQueryStr);
    });
}

module.exports = seed;
