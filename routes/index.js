const router = require("express").Router();

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/cars", isLoggedIn, (req, res, next) => {
  res.render("cars");
});

module.exports = router;
