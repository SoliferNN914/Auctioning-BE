const db = require('../db/connection')
const { checkExists } = require('../utils/check-exists')

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
  if (active && !['true', 'false'].includes(active.toLowerCase())) {
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

exports.selectEventsByUserId = (distance = 8, user_id) => {
  if (typeof distance !== 'number' && isNaN(distance)) {
    return Promise.reject({ status: 400, msg: 'Invalid distance query' })
  }
  return db
    .query(`SELECT coords FROM users WHERE user_id = $1`, [user_id])
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: 'User not found.' })
      const userCoords = rows[0].coords
      let queryStr = `
      SELECT *, point(${userCoords.x}, ${userCoords.y}) <@>  (businesses.coords) as distance_in_miles
      FROM events
      LEFT JOIN businesses ON events.business_id = businesses.business_id
      WHERE point(${userCoords.x}, ${userCoords.y}) <@> (businesses.coords) < $1
      AND active = true
      ORDER BY distance_in_miles`
      return db.query(queryStr, [distance]).then(({ rows }) => {
        return rows
      })
    })
}

exports.insertNewEvent = (new_event) => {
  for (const key in new_event) {
    if (new_event[key] === "" || new_event.available_seats.length === 0) {
      return Promise.reject({ status: 400, msg: 'Bad Request: Missing Required Fields' })
    }
  }
  return checkExists("businesses", "business_id", new_event.business_id, "Business").then(()=>{
    const {
      film_title,
      poster,
      certificate,
      run_time,
      start_time,
      available_seats,
      start_price,
      business_id,
    } = new_event
    return db.query(
      `INSERT INTO events (film_title, poster, certificate, run_time, start_time, available_seats, start_price, business_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
      [
        film_title,
        poster,
        certificate,
        run_time,
        start_time,
        available_seats,
        start_price,
        business_id,
      ])
  })
  .then(({rows}) => { return rows[0]})
}
