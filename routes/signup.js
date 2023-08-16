const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { addUser } = require("../controllers/users");

const celebrateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .required()
      .regex(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

router.post("/", celebrateValidator, addUser);

module.exports = router;