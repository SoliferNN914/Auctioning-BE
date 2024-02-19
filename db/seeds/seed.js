const format = require('pg-format')
const db = require('../connection')

function seed({ userData, auctionData, businessesData, eventsData }) {
  return db
  .query(`DROP TABLE IF EXISTS users;`)
  .then(() => db.query(`DROP TABLE IF EXISTS bidding;`))
  .then(() => db.query("CREATE EXTENSION IF NOT EXISTS cube;"))
  .then(() => db.query("CREATE EXTENSION IF NOT EXISTS earthdistance;"))
  
  .then(() => 
  db.query(`
  CREATE TABLE businesses (
    business_id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    postcode VARCHAR(15),
    coordinates POINT,
    seating_layout TEXT[][]
    )`))
    .then(() => {
      const insertBusinessesQuertStr = format(
        'INSERT INTO businesses (name, postcode, coordinates, seating_layout) VALUES %L;',
        businessesData.map(({ name, postcode, coordinates, seating_layout }) => [name, postcode, coordinates, seating_layout])
        )
        return db.query(insertBusinessesQuertStr)
      })
      .then(()=>
      `CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        event_title VARCHAR(40),
        poster TEXT,
        certificate VARCHAR(350),
        runtime INT,
        start_time TIMESTAMP,
        available_seats TEXT[],
        active BOOLEAN DEFAULT true,
        start_price INT,
        business_id INT REFERENCES businesses(business_id),
      )`)
      .then(() => {
        const insertEventsQueryStr = format(
          'INSERT INTO events (event_title, poster, certificate, runtime, start_time, available_seats, active, start_price, business_id) VALUES %L;',
          eventsData.map(({ event_title, poster, certificate, runtime, start_time , available_seats, active, start_price, business_id }) => [event_title, poster, certificate, runtime, start_time, available_seats, active, start_price, business_id])
        )
        return db.return(insertEventsQueryStr)
      })
      .then(() =>
      db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(40) NOT NULL,
        postcode VARCHAR(15),
        coordinates POINT,
        currently_bidding INT DEFAULT null REFERENCES auctions(auction_id),
        device_token VARCHAR(350) DEFAULT null
        )`)
    )
    .then(() => {
      const insertUsersQueryStr = format(
        'INSERT INTO users (username, postcode, coordinates, currently_bidding, device_token) VALUES %L;',
        userData.map(({ username, postcode, coordinates, currently_bidding, device_token }) => [username, postcode, coordinates, currently_bidding, device_token])
      )
      return db.query(insertUsersQueryStr)
    })
    .then(() => 
    db.query(`
      CREATE TABLE auctions (
        auction_id SERIAL PRIMARY KEY,
        event_id INT REFERENCES events(event_id),
        seat_selection TEXT,
        current_price INT,
        time_started TIMESTAMP,
        time_ending TIMESTAMP,
        current_highest_bidder INT REFERENCES users(user_id),
        users_involved INT,
        active BOOLEAN DEFAULT true,
        bid_counter INT DEFAULT 1
      )`))
      .then(() => {
        const insertAuctionsQueryStr = format(
          'INSERT INTO auctions (event_id, seat_selection, current_price, time_started, time_ending, current_highest_bidder, users_involved, active, bid_counter) VALUES %L;',
          auctionData.map(({ event_id, seat_selection, current_price, time_started, time_ending, current_highest_bidder, users_involved, active, bid_counter }) => [event_id, seat_selection, current_price, time_started, time_ending, current_highest_bidder, users_involved, active, bid_counter])
        )
        return db.query(insertAuctionsQueryStr)
      })
}
module.exports = seed
