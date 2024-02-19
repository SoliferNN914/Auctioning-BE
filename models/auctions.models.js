const db = require('../db/connection')

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
