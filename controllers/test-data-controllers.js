const {
  selectUsers,
  updateUser,
  selectUsersById,
} = require("../models/test-data-models");

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

exports.getUsersById = (req, res, next) => {
  const { user_id } = req.params;
  selectUsersById(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchUsers = (req, res, next) => {
  const { username } = req.body;
  const { user_id } = req.params;
  
  if (!username) {
    return res.status(400).send({ error: "Username is required" });
  }

  updateUser({ username, user_id }) 
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User Not Found" });
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
