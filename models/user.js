/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      minlength: [2, "Минимальная длина поля- 2 символа"],
      maxlength: [30, "Максимальная длина поля- 30 символов"],
    },
    about: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      minlength: [2, "Минимальная длина поля - 2 символа"],
      maxlength: [30, "Максимальная длина поля - 30 символов"],
    },
    avatar: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      validate: {
        validator(v) {
          return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
            v
          );
        },
        message: "Введите URL",
      },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
