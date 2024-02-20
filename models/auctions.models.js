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

exports.updateAuctionsById = (req) => {
  const { event_id } = req.params;
  const { seat_selection, users_involved } = req.body;

  return db.query(
    `UPDATE auctions SET seat_selection = $1, users_involved = $2 WHERE event_id = $3 RETURNING *`,
    [seat_selection, users_involved, event_id]
  )
  .then(({ rows }) => {
    if (rows.length === 0) {
      throw { status: 404, msg: 'Auction not found' };
    }
    return rows[0];
  })
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
