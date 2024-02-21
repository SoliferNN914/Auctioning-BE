const format = require('pg-format')
const db = require('../connection')
const { convertTimestampToDate } = require('./utils')

function seed({ userData, auctionData, businessesData, eventsData }) {
  return db
    .query(`DROP TABLE IF EXISTS businesses cascade;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events cascade;`)
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users cascade;`)
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS auctions;`)
    })
    .then(() => {
      return db.query('CREATE EXTENSION IF NOT EXISTS cube;')
    })
    .then(() => {
      return db.query('CREATE EXTENSION IF NOT EXISTS earthdistance;')
    })

    .then(() => {
      return db.query(`
  CREATE TABLE businesses (
    business_id SERIAL PRIMARY KEY,
    business_name VARCHAR(50),
    postcode VARCHAR(15),
    coords POINT,
    seating_layout TEXT[][]
    )`)
    })
    .then(() => {
      const insertBusinessesQuertStr = format(
        'INSERT INTO businesses (business_name, postcode, coords, seating_layout) VALUES %L;',
        businessesData.map(
          ({ business_name, postcode, coords, seating_layout }) => [
            business_name,
            postcode,
            coords,
            seating_layout,
          ]
        )
      )
      return db.query(insertBusinessesQuertStr)
    })
    .then(() => {
      return db.query(
        `CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        film_title VARCHAR(120),
        poster TEXT,
        certificate VARCHAR(350),
        run_time INT,
        start_time TIMESTAMP,
        available_seats TEXT[],
        active BOOLEAN DEFAULT true,
        start_price DECIMAL,
        business_id INT REFERENCES businesses(business_id)
      )`
      )
    })
    .then(() => {
      const formattedEventsData = eventsData.map(convertTimestampToDate);
      const insertEventsQueryStr = format(
        'INSERT INTO events (film_title, poster, certificate, run_time, start_time, available_seats, active, start_price, business_id) VALUES %L RETURNING *;',
        formattedEventsData.map(
          ({
            film_title,
            poster,
            certificate,
            run_time,
            start_time,
            available_seats,
            active,
            start_price,
            business_id,
          }) => [
            film_title,
            poster,
            certificate,
            run_time,
            start_time,
            available_seats,
            active,
            start_price,
            business_id,
          ]
        )
      )
      return db.query(insertEventsQueryStr)
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(40) NOT NULL,
        postcode VARCHAR(15),
        coords POINT,
        currently_bidding BOOLEAN DEFAULT false,
        device_token VARCHAR(350) DEFAULT null
        )`)
    })
    .then(() => {
      const insertUsersQueryStr = format(
        'INSERT INTO users (username, postcode, coords, currently_bidding, device_token) VALUES %L;',
        userData.map(({ username, postcode, coords, currently_bidding, device_token }) => [
          username,
          postcode,
          coords,
          currently_bidding,
          device_token,
        ])
      )
      return db.query(insertUsersQueryStr)
    })
    .then(() => {
      return db.query(`
      CREATE TABLE auctions (
        auction_id SERIAL PRIMARY KEY,
        event_id INT REFERENCES events(event_id),
        seat_selection TEXT[],
        current_price DECIMAL,
        time_started TIMESTAMP DEFAULT NOW(),
        time_ending TIMESTAMP,
        current_highest_bidder INT REFERENCES users(user_id),
        users_involved INT[],
        active BOOLEAN DEFAULT true,
        bid_counter INT DEFAULT 1
      )`)
    })
    .then(() => {
      const insertAuctionsQueryStr = format(
        'INSERT INTO auctions (event_id, seat_selection, current_price, time_started, time_ending, current_highest_bidder, users_involved, active, bid_counter) VALUES %L;',
        auctionData.map(
          ({
            event_id,
            seat_selection,
            current_bid,
            time_started,
            time_ending,
            current_highest_bidder,
            users_involved,
            active,
            bid_counter,
          }) => [
            event_id,
            seat_selection,
            current_bid,
            time_started,
            time_ending,
            current_highest_bidder,
            users_involved,
            active,
            bid_counter,
          ]
        )
      )
      return db.query(insertAuctionsQueryStr)
    })
}
module.exports = seed
