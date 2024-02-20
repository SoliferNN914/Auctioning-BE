const db = require('../db/connection')
const { checkExists } = require('../utils/check-exists')

exports.fetchAuctionsById = (event_id) => {
  return db
    .query(`SELECT * FROM auctions WHERE auctions.event_id = $1`, [event_id])
    .then((auction) => {
      if (!auction.rows.length) {
        return Promise.reject({ status: 404, msg: 'Auction does not exist' })
      }
      return auction.rows[0]
    })
}

exports.updateAuctionsById = (auction_id, current_bid, user_id) => {
  return db
    .query(`SELECT * FROM auctions WHERE auction_id = $1 AND active = true`, [auction_id])
    .then(() => {


      return db.query(
        `UPDATE auctions 
          SET current_price = $1, 
              current_highest_bidder = $2,
              bid_counter = bid_counter + 1,
              users_involved = array_append(users_involved, $2)
          WHERE auction_id = $3
          RETURNING *`,
        [current_bid, user_id, auction_id]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};


exports.selectAuctionsByUserInvolved = (user_id, active) => {
  if (active && !['true', 'false'].includes(active.toLowerCase())) {
    return Promise.reject({ status: 400, msg: 'Invalid active query' })
  }
  return checkExists('users', 'user_id', user_id, 'User')
    .then(() => {
      const queryValues = [user_id]
      let queryStr = `SELECT * FROM auctions WHERE $1=ANY(users_involved)`
      if (active) {
        queryValues.push(active)
        queryStr += ' AND active = $2'
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
        `SELECT * FROM auctions WHERE current_highest_bidder=$1 AND active=false`,
        [user_id]
      )
    })
    .then(({ rows }) => {
      return rows
    })
}
