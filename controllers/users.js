const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((updatedUser) => {
      res.status(201).send(updatedUser);
    })
    .catch(() =>
      res.status(404).send({ message: "Пользователь с указанным id не найден" })
    );
};

module.exports.editUserData = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  if (userId) {
    User.findByIdAndUpdate(userId, { name, about }, { new: true })
      .then((updatedUser) => res.status(201).send(updatedUser))
      .catch((err) => {
        if (err.name === "ValidationError") {
          res.status(400).send({ message: err.message });
        } else {
          res
            .status(404)
            .send({ message: "Пользователь с указанным id не найден" });
        }
      });
  } else {
    res.status(500).send({ message: "Произошла ошибка" });
  }
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  if (userId) {
    User.findByIdAndUpdate(userId, { avatar }, { new: true })
      .then((updatedUser) => res.status(201).send(updatedUser))
      .catch((err) => {
        if (err.name === "ValidationError") {
          res.status(400).send({ message: err.message });
        } else {
          res
            .status(404)
            .send({ message: "Пользователь с указанным id не найден" });
        }
      });
  } else {
    res.status(500).send({ message: "Произошла ошибка" });
  }
};
