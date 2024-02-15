const { selectUsers } = require('../models/test-data-models')

const fs = require("fs/promises");

exports.getUsers = (req, res, next) => {
    selectUsers()
      .then((users) => {
        res.status(200).send({ users });
      })
      .catch((err) => {
        next(err);
      });
  }