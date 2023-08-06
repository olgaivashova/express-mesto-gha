/* eslint-disable comma-dangle */
const router = require("express").Router();

const {
  addUser,
  getUsers,
  getUserById,
  editUserInfo,
  editUserAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", addUser);
router.patch("/me", editUserInfo);
router.patch("/me/avatar", editUserAvatar);

module.exports = router;
