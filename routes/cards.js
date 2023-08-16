/* eslint-disable comma-dangle */
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  addCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
} = require("../controllers/cards");

router.get("/", getCards);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .regex(
          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
        ),
    }),
  }),
  addCard
);
router.delete(
  "/:cardId",
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum().length(24),
    }),
  }),
  deleteCard
);
router.put(
  "/:cardId/likes",
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum().length(24),
    }),
  }),
  putLike
);

router.delete(
  "/:cardId/likes",
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum().length(24),
    }),
  }),
  deleteLike
);

module.exports = router;
