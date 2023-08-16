const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { login } = require("../controllers/users");

const celebrateValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

router.post("/", celebrateValidator, login);

module.exports = router;
