/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
const router = require("express").Router();
const {
  celebrateAddCard,
  celebrateGetCardById,
} = require("../middlewares/joi");
const {
  addCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", celebrateAddCard, addCard);
router.delete("/:cardId", celebrateGetCardById, deleteCard);
router.put("/:cardId/likes", celebrateGetCardById, putLike);
router.delete("/:cardId/likes", celebrateGetCardById, deleteLike);

module.exports = router;
