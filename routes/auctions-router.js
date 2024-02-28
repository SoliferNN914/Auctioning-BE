const {
  getAuctionsByEventId,
  getAuctionsByUserInvolved,
  patchAuctionsById,
  getAuctionsWonByUserId,
  postAuction,
  getAuctionByAuctionId,
} = require('../controllers/auctions.controllers')

const auctionRouter = require('express').Router()

auctionRouter.post('/', postAuction)
auctionRouter
  .route('/:auction_id')
  .get(getAuctionByAuctionId)
  .patch(patchAuctionsById)
auctionRouter.get('/event/:event_id', getAuctionsByEventId)
auctionRouter.get('/user/:user_id', getAuctionsByUserInvolved)
auctionRouter.get('/won/:user_id', getAuctionsWonByUserId)
module.exports = auctionRouter
