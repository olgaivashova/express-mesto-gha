/* eslint-disable comma-dangle */
const router = require("express").Router();
const {
  celebrateGetUserById,
  celebrateEditUserInfo,
  celebrateEditUserAvatar,
} = require("../middlewares/joi");

const {
  getUsers,
  getMe,
  getUserById,
  editUserInfo,
  editUserAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getMe);
router.get("/:userId", celebrateGetUserById, getUserById);
router.patch("/me", celebrateEditUserInfo, editUserInfo);
router.patch("/me/avatar", celebrateEditUserAvatar, editUserAvatar);

module.exports = router;
