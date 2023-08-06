/* eslint-disable comma-dangle */
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const bodyParser = require("body-parser");

const app = express();
const routerUsers = require("./routes/users");
const routerCards = require("./routes/cards");

mongoose
  .connect("mongodb://127.0.0.1:27017/mydb", {
    useNewUrlParser: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(123456);
  });

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "64c812f5c860e3c716e415af",
  };
  next();
});

app.use("/users", routerUsers);
app.use("/cards", routerCards);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ссылка на сервер ${PORT}`);
});
