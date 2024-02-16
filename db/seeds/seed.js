
const format = require("pg-format");
const db = require("../connection");

function seed({userData, biddingData}) {
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS bidding;`)
    })

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
        item_id SERIAL PRIMARY KEY,
        film_name VARCHAR(40) NOT NULL,
        price INT NOT NULL
        );`);
    })
    .then(() => {
      const insertBiddingQueryStr = format(
        "INSERT INTO bidding (film_name, price) VALUES %L;",
        biddingData.map(({ film_name, price }) => [
          film_name,
          price,
        ])
      );
      return db.query(insertBiddingQueryStr);
    });
}

module.exports = seed;
