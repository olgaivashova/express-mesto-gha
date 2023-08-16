const { celebrate, Joi } = require("celebrate");

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});
module.exports.celebrateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

module.exports.celebrateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
});
module.exports.celebrateEditUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
module.exports.celebrateEditUserAvatar = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .required()
      .regex(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      ),
  }),
});

module.exports.celebrateAddCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .regex(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      ),
  }),
});

module.exports.celebrateGetCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
});
