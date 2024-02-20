const db = require('../db/connection')
const postcodes = require('node-postcodes.io')

exports.fetchAllBusinesses = () => {
  return db.query(`SELECT * FROM businesses`).then((businesses) => {
    return businesses.rows
  })
}

exports.fetchBusinessById = (business_id) => {
  return db
    .query(`SELECT * FROM businesses WHERE businesses.business_id = $1`, [
      business_id,
    ])
    .then((business) => {
      if (!business.rows.length) {
        return Promise.reject({ status: 404, msg: 'ID not found' })
      }
      return business.rows[0]
    })
}

exports.insertBusiness = (new_business) => {
  const { business_name, postcode, seating_layout } = new_business
  if (
    [business_name, postcode, seating_layout].some((value) => !value) ||
    seating_layout.length === 0
  ) {
    return Promise.reject({
      status: 400,
      msg: 'Bad Request: Missing Required Fields',
    })
  }
  return postcodes
    .lookup(postcode)
    .then(({ result: { longitude, latitude } }) => {
      return db.query(
        `INSERT INTO businesses (business_name, postcode, coords, seating_layout)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
        [business_name, postcode, `${longitude},${latitude}`, seating_layout]
      )
    })
    .then(({ rows }) => {
      return rows[0]
    })
}
