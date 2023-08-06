const router = require("express").Router();
const {
  addCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
} = require("../controllers/cards");

router.get("/", getCards);
router.delete("/:cardId", deleteCard);
router.post("/", addCard);
router.put("/:cardId/likes", putLike);
router.delete("/:cardId/likes", deleteLike);

module.exports = router;
