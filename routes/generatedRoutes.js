const router = require("express").Router();
const auth = require("../middlewares/auth");
const routerUsers = require("./users");
const routerCards = require("./cards");
const routerSignup = require("./signup");
const routerLogin = require("./login");
const { NotFoundError } = require("../errors/notFoundError");

router.use("/signup", routerSignup);
router.use("/signin", routerLogin);
router.use(auth);
router.use("/users", routerUsers);
router.use("/cards", routerCards);
router.use("*", (req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

module.exports = router;
