const db = require('../db/connection')
const { auctionEndJob } = require('../scheduled/auctionEndJob')
const { checkExists } = require('../utils/check-exists')
const { updateUserBiddingStatus } = require('./users.models')

exports.fetchAuctionsByEventId = (event_id) => {
  return checkExists('events', 'event_id', event_id, 'Event')
    .then(() => {
      return db.query(
        `SELECT * FROM auctions WHERE auctions.event_id = $1 AND active = true`,
        [event_id]
      )
    })
    .then(({ rows }) => {
      return rows
    })
}

exports.updateAuctionsById = (auction_id, updateAuctionData) => {
  const { current_bid, user_id } = updateAuctionData
  if ([current_bid, user_id].includes(undefined))
    return Promise.reject({
      status: 400,
      msg: 'Bad Request: Missing Required Fields',
    })
  return checkExists('auctions', 'auction_id', auction_id, 'Auction')
    .then(() => {
      return db.query(`SELECT * FROM auctions WHERE auction_id = $1`, [
        auction_id,
      ])
    })
    .then(({ rows }) => {
      if (+rows[0].current_price >= +current_bid)
        return Promise.reject({ status: 400, msg: 'Bid too low.' })
      if (!rows[0].active)
        return Promise.reject({ status: 400, msg: 'Auction closed.' })
      const currentUsers = rows[0].users_involved
      return currentUsers.includes(user_id)
        ? currentUsers
        : [...currentUsers, user_id]
    })
    .then((updatedUsers) => {
      return db.query(
        `UPDATE auctions 
          SET current_price = $1, 
              current_highest_bidder = $2,
              bid_counter = bid_counter + 1,
              users_involved = $4
          WHERE auction_id = $3
          RETURNING *`,
        [current_bid, user_id, auction_id, updatedUsers]
      )
    })
    .then(({ rows }) => {
      return rows[0]
    })
}

exports.selectAuctionsByUserInvolved = (user_id, active) => {
  if (active && !['true', 'false'].includes(active.toLowerCase())) {
    return Promise.reject({ status: 400, msg: 'Invalid active query' })
  }
  return checkExists('users', 'user_id', user_id, 'User')
    .then(() => {
      const queryValues = [user_id]
      let queryStr = `SELECT auctions.*,
      film_title,poster,certificate,run_time,start_time,
      events.active AS event_active,
      business_name, postcode, coords, businesses.business_id
      FROM auctions 
      INNER JOIN events ON events.event_id = auctions.event_id
      INNER JOIN businesses ON events.business_id = businesses.business_id
      WHERE $1=ANY(users_involved)`
      if (active) {
        queryValues.push(active)
        queryStr += ' AND auctions.active = $2'
      }
      return db.query(queryStr, queryValues)
    })
    .then(({ rows }) => {
      return rows
    })
}

exports.selectAuctionsWonByUserId = (user_id) => {
  return checkExists('users', 'user_id', user_id, 'User')
    .then(() => {
      return db.query(
        `SELECT auctions.*,
        film_title,poster,certificate,run_time,start_time,
        events.active AS event_active,
        business_name, postcode, coords, businesses.business_id
        FROM auctions 
        INNER JOIN events ON events.event_id = auctions.event_id
        INNER JOIN businesses ON events.business_id = businesses.business_id
        WHERE current_highest_bidder=$1 AND auctions.active=false
        ORDER BY events.start_time DESC`,
        [user_id]
      )
    })
    .then(({ rows }) => {
      return rows
    })
}

exports.insertAuction = (new_auction) => {
  const { event_id, seat_selection, current_price, user_id } = new_auction
  const auctionEnd = new Date().setSeconds(new Date().getSeconds() + 10)
  return checkExists('users', 'user_id', user_id, 'User')
    .then(() => {
      return checkExists('events', 'event_id', event_id, 'Event')
    })
    .then(() => {
      return db.query(
        'SELECT available_seats FROM events WHERE event_id = $1',
        [event_id]
      )
    })
    .then(({ rows }) => {
      if (
        !seat_selection.every(function (val) {
          return rows[0].available_seats.indexOf(val) !== -1
        })
      )
        return Promise.reject({
          status: 400,
          msg: 'Seats not available.',
        })
    })
    .then(() => {
      return db.query(
        'SELECT seat_selection FROM auctions WHERE event_id = $1',
        [event_id]
      )
    })
    .then(({ rows }) => {
      const checkSeats = seat_selection.every((val) =>
        rows.some((element) => element.seat_selection.indexOf(val) !== -1)
      )
      if (checkSeats)
        return Promise.reject({
          status: 400,
          msg: 'One or more seats already under auction.',
        })
    })
    .then(() => {
      if (
        [event_id, seat_selection, current_price, user_id].some(
          (value) => !value
        ) ||
        seat_selection.length === 0
      ) {
        return Promise.reject({
          status: 400,
          msg: 'Bad Request: Missing Required Fields',
        })
      }

      return db.query(
        'UPDATE users SET currently_bidding = true WHERE user_id = $1',
        [user_id]
      )
      // Pausing this as currently allowing users to bid on more than one
      //updateUserBiddingStatus(user_id)
    })
    .then(() => {
      return db.query(
        `
      INSERT INTO auctions (event_id, seat_selection, current_price, users_involved, time_ending, current_highest_bidder)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
        [
          event_id,
          seat_selection,
          current_price,
          `{${user_id}}`,
          new Date(auctionEnd),
          user_id,
        ]
      )
    })
    .then(({ rows }) => {
      if (process.env.NODE_ENV !== 'test') {
        auctionEndJob(auctionEnd, rows[0].auction_id)
      }
      return rows[0]
    })
}

exports.selectAuctionByAuctionId = (auction_id) => {
  return db
    .query('SELECT * FROM auctions WHERE auction_id = $1', [auction_id])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({
          status: 404,
          msg: 'Auction not found.',
        })
      return rows[0]
    })
}
