/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HTTP_STATUS_CREATED } = require("http2").constants;
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  // хешируем пароль
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash, // записываем хеш в базу
      })
    )
    .then((user) => {
      res.status(HTTP_STATUS_CREATED).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError("Пользователь с данным email уже зарегистрирован")
        );
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError("Вы ввели некорректный id"));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError("Передан несуществующий id пользователя"));
      } else {
        next(err);
      }
    });
};

module.exports.editUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Передан несуществующий id пользователя"));
      } else {
        next(err);
      }
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Передан несуществующий id пользователя"));
      } else {
        next(err);
      }
    });
};
