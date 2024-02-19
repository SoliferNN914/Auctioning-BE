const db = require('../db/connection')

exports.updateSeatingById = (seats_sold, event_id) => {
  return db
    .query(`SELECT * FROM EVENTS WHERE event_id = $1`, [event_id])
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

exports.fetchEventById = (event_id) => {
  return db
    .query(`SELECT * FROM events WHERE events.event_id = $1`, [event_id])
    .then((event) => {
      if (!event.rows.length) {
        return Promise.reject({ status: 404, msg: 'ID not found' })
      }
      return event.rows[0]
    })
}
