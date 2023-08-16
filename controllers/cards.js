/* eslint-disable comma-dangle */
const Card = require("../models/card");
const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require("http2").constants;
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ForbiddenError = require("../errors/forbiddenError");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};
module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card.owner.equals(req.user_id)) {
        throw new ForbiddenError("Карточка принадлежит другому пользователю");
      }
      Card.findByIdAndDelete(card);
      orFail();
      res.send({ message: "Карточка удалена" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Введены некорректные данные"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Карточка с указанным id не найдена"));
      } else {
        next(err);
      }
    });
};

module.exports.putLike = (req, res, next) => {
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
      if (err.name === "CastError") {
        next(new BadRequestError("Введены некорректные данные"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Карточка с указанным id не найдена"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
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
      if (err.name === "CastError") {
        next(new BadRequestError("Введены некорректные данные"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Карточка с указанным id не найдена"));
      } else {
        next(err);
      }
    });
};
