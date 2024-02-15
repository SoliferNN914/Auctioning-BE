const { selectUsers, insertUser } = require("../models/test-data-models");

const fs = require("fs/promises");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUsers = (req, res, next) => {
  insertUser(req.body)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
