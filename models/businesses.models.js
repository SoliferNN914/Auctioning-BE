const db = require('../db/connection')

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
        return Promise.reject({ status: 404, msg: 'Business does not exist' })
      }
      return business.rows[0]
    })
}
