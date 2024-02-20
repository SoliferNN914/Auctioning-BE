const {
  fetchAuctionsById,
  selectAuctionsByUserInvolved,
} = require('../models/auctions.models')

exports.getAuctionsById = (req, res, next) => {
  const { event_id } = req.params
  fetchAuctionsById(event_id)
    .then((auction) => {
      res.status(200).send({ auction })
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
