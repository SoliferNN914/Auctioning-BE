const schedule = require('node-schedule')
const db = require('../db/connection')
const { updateUserBiddingStatus } = require('../models/users.models')
const { updateSeatingById } = require('../models/events.models')
const auctionFunction = require('../models/auctions.models')

auctionEndJobSql = async (auction_id) => {
  const resultObject = {}
  try {
    await db.query(`UPDATE auctions SET active = false WHERE auction_id = $1`, [
      auction_id,
    ])
    const { rows } = await db.query(
      `SELECT * FROM auctions WHERE auction_id = $1`,
      [auction_id]
    )
    const auction = rows[0]
    const updatedEvent = await updateSeatingById(
      auction.seat_selection,
      auction.event_id
    )
    resultObject.eventSeats = updatedEvent.available_seats
    resultObject.auction = auction
    // Generate messages for push notifications (future feature)
    resultObject.users = []
    resultObject.messages = {}
    for (let i = 0; i < auction.users_involved.length; i++) {
      const user_id = auction.users_involved[i]
      // If user is only involved in one auction, change status
      const involved = await auctionFunction.selectAuctionsByUserInvolved(
        user_id,
        'true'
      )
      let user
      if (!involved.length) {
        user = await updateUserBiddingStatus(user_id)
      }
      resultObject.users.push(user)
      if (user_id === auction.current_highest_bidder)
        resultObject.messages[user_id] = 'You won!'
      else resultObject.messages[user_id] = 'You lost!'
    }
    return resultObject
  } catch (err) {
    return err
  }
}

exports.auctionEndJob = (endTime, auction_id) => {
  const auctionJob = schedule.scheduleJob(endTime, async () => {
    await auctionEndJobSql(auction_id)
  })
}
