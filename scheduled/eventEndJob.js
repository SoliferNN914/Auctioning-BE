const schedule = require('node-schedule')
const db = require('../db/connection')

eventEndJobSql = async (event_id) => {
  try {
    // Set event to closed
    await db.query(`UPDATE events SET active = false WHERE event_id = $1`, [
      event_id,
    ])
    return
  } catch (err) {
    return err
  }
}

exports.eventEndJob = (endTime, event_id) => {
  const eventJob = schedule.scheduleJob(endTime, async () => {
    await eventEndJobSql(event_id)
  })
}
