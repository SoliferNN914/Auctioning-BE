const { userData } = require("./data/index.js");
const format = require("pg-format");
const db = require("./connection");

function seed() {
  return db
    .query("DROP TABLE IF EXISTS rides;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS parks;");
    })
    .then(() => {
      return createUsersTable();
    })

function createUsersTable() {
  const query = `  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    profile_url VARCHAR(350) NOT NULL,
  )`;
}

module.exports = seed;