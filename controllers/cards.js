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
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка с указанным id не найдена" });
        return;
      }
      res.status(201).send({ message: "Карточка удалена" });
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Передан несуществующий id карточки" });
        return;
      }
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Передан несуществующий id карточки" });
        return;
      }
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};