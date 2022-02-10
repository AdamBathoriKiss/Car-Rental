const router = require("express").Router();
const User = require("../models/Users.model");
const Car = require("../models/Cars.model");
const fileUploader = require('../config/cloudinary.config');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

router.get("/", (req, res) => {
  Car.find()
    .then((carsFromDB) => res.render("index", { cars: carsFromDB }))
    .catch((err) => console.log(`Error while getting cars from the database: ${err}`));
});




module.exports = router;
