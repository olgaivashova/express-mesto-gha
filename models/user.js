/* eslint-disable comma-dangle */
const mongoose = require("mongoose");
//const validate = require("mongoose-validator");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UnauthorizedError = require("../errors/unauthorizedError");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Жак-Ив Кусто",
      minlength: [2, "Минимальная длина поля- 2 символа"],
      maxlength: [30, "Максимальная длина поля- 30 символов"],
    },
    about: {
      type: String,
      default: "Исследователь",
      minlength: [2, "Минимальная длина поля - 2 символа"],
      maxlength: [30, "Максимальная длина поля - 30 символов"],
    },
    avatar: {
      type: String,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: function checkUrl(url) {
          return url && validator.isURL(url);
        },
        message: "Введите URL",
      },
    },

    email: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      unique: true,
      validate: {
        validator: function checkEmail(email) {
          return email && validator.isEmail(email);
        },
        message: "Введите e-mail",
      },
    },
    password: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      minlength: 5,
      select: false,
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        throw new UnauthorizedError("Неправильные почта или пароль");
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Неправильные почта или пароль");
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
