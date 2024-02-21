const {
  fetchAuctionsByEventId,
  selectAuctionsByUserInvolved,
  updateAuctionsById,
  selectAuctionsWonByUserId,
  insertAuction,
} = require('../models/auctions.models')

exports.getAuctionsByEventId = (req, res, next) => {
  const { event_id } = req.params
  fetchAuctionsByEventId(event_id)
    .then((auctions) => {
      res.status(200).send({ auctions })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getAuctionsByUserInvolved = (req, res, next) => {
  const { user_id } = req.params
  const { active } = req.query
  selectAuctionsByUserInvolved(user_id, active)
    .then((auctions) => {
      res.status(200).send({ auctions })
    })
    .catch((err) => {
      next(err)
    })
}

exports.patchAuctionsById = (req, res, next) => {
  const { auction_id } = req.params
  const { current_bid, user_id } = req.body

  updateAuctionsById(auction_id, current_bid, user_id)
    .then((auction) => {
      if (!auction) {
        return Promise.reject({ status: 404, msg: 'Auction not found' })
      }
      res.status(200).send({ auction })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getAuctionsWonByUserId = (req, res, next) => {
  const { user_id } = req.params
  selectAuctionsWonByUserId(user_id)
    .then((auctions) => {
      res.status(200).send({ auctions })
    })
    .catch((err) => {
      next(err)
    })
}

exports.postAuction = (req, res, next) => {
  const { event_id } = req.params
  const { seat_selection, current_price, user_id, time_started } = req.body

  const users_involved = [user_id]

  insertAuction({
    event_id,
    seat_selection,
    current_price: current_price,
    user_id,
    time_started,
    users_involved,
  })
    .then((auction) => {
      res.status(201).send({ auction })
    })
    .catch((err) => {
      next(err)
    })
}
