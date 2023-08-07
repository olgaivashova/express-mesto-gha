/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      minlength: [2, "Минимальная длина поля - 2 символа"],
      maxlength: [30, "Максимальная длина поля - 30 символов"],
    },
    link: {
      type: String,
      required: [true, "Поле должно быть заполнено"],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Введите URL",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("card", cardSchema);
