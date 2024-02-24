const {
  fetchAuctionsByEventId,
  selectAuctionsByUserInvolved,
  updateAuctionsById,
  selectAuctionsWonByUserId,
  insertAuction,
  selectAuctionByAuctionId,
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
  const updateAuctionData = req.body
  
  updateAuctionsById(auction_id, updateAuctionData)
  .then((auction) => {
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
  const new_auction = req.body
  insertAuction(new_auction)
    .then((auction) => {
      res.status(201).send({ auction })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getAuctionByAuctionId = (req, res, next) => {
  const { auction_id } = req.params
  selectAuctionByAuctionId(auction_id)
    .then((auction) => {
      res.status(200).send({ auction })
    })
    .catch((err) => {
      next(err)
    })
}
