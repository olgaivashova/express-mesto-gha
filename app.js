/* eslint-disable comma-dangle */
const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1:27017/mydb" } = process.env;
const bodyParser = require("body-parser");

const app = express();
const helmet = require("helmet");
const { errors } = require("celebrate");
const routerUsers = require("./routes/users");
const routerCards = require("./routes/cards");
const routerSignup = require("./routes/signup");
const routerLogin = require("./routes/login");
const auth = require("./middlewares/auth");
const { NotFoundError } = require("./errors/notFoundError");

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(123456);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use("/signup", routerSignup);
app.use("/signin", routerLogin);
app.use(auth);
app.use("/users", routerUsers);
app.use("/cards", routerCards);
app.use(errors());
// app.use("*", (req, res, next) => {
// next(new NotFoundError("Страница не найдена"));
// });
app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.NotFound) {
    next(new NotFoundError("Страница не найдена"));
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ссылка на сервер ${PORT}`);
});
