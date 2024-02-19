const db = require('../db/connection')

exports.fetchAuctionsById = (event_id) => {
    return db
      .query(`SELECT * FROM auctions WHERE auctions.event_id = $1`, [
        event_id,
      ])
      .then((auction) => {
        if (!auction.rows.length) {
          return Promise.reject({ status: 404, msg: 'Auction does not exist' })
        }
        return auction.rows[0]
      })
  }
  