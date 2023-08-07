/* eslint-disable comma-dangle */
const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then(() => {
      res.send({ message: "Карточка удалена" });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Вы ввели некорректные данные" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Карточка с указанным id не найдена" });
      } else {
        res.status(500).send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .populate(["owner", "likes"])
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Вы ввели некорректные данные" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Карточка с указанным id не найдена" });
      } else {
        res.status(500).send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .populate(["owner", "likes"])
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Вы ввели некорректные данные" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Карточка с указанным id не найдена" });
      } else {
        res.status(500).send({ message: "На сервере произошла ошибка" });
      }
    });
};
