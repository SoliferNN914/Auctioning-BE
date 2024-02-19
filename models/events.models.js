const db = require('../db/connection')

exports.updateSeatingById = (seats_sold, event_id) => {
  return db
    .query(`SELECT * FROM events WHERE event_id = $1`, [event_id])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: 'Event not found.' })
      if (!Array.isArray(seats_sold) || !seats_sold.length)
        return Promise.reject
      const currentSeats = rows[0].available_seats
      const updatedSeats = currentSeats.filter(
        (seat) => !seats_sold.includes(seat)
      )
      return db.query(
        `UPDATE events SET available_seats = $1 WHERE event_id = $2 RETURNING *`,
        [updatedSeats, event_id]
      )
    })
    .then(({ rows }) => {
      return rows[0]
    })
}

exports.selectEventsByBusinessId = (active, business_id) => {
  if (active && !["true","false"].includes(active.toLowerCase())) {
    return Promise.reject({ status: 400, msg: 'Invalid active query' })
  }
  const queryValues = [business_id]
  let queryStr = `SELECT * FROM events WHERE business_id = $1`
  if (active) {
    queryValues.push(active)
    queryStr += ' AND active = $2'
  }
  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows
  })
}
