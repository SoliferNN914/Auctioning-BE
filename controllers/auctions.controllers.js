const { fetchAuctionsById, updateAuctionsById } = require('../models/auctions.models')

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

exports.patchAuctionsById = (req, res, next) => {
    updateAuctionsById(req)
      .then((auction) => {
        res.status(200).send({ auction });
      })
      .catch((err) => {
        next(err);
      });
  };
  