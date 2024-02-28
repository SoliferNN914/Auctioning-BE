const schedule = require('node-schedule')
const db = require('../db/connection')

eventEndJobSql = async (event_id) => {
  try {
    const result = await db.query(
      `UPDATE events SET active = false WHERE event_id = $1 RETURNING *`,
      [event_id]
    )
    return result
  } catch (err) {
    return err
  }
}

exports.eventEndJob = (endTime, event_id) => {
  const eventJob = schedule.scheduleJob(endTime, async () => {
    await eventEndJobSql(event_id)
  })
}
