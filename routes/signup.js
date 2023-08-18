/* eslint-disable linebreak-style */
const router = require("express").Router();
const { celebrateCreateUser } = require("../middlewares/joi");
const { createUser } = require("../controllers/users");

router.post("/", celebrateCreateUser, createUser);

module.exports = router;
