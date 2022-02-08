const router = require("express").Router();

const User = require("../models/Users.model");

// GET route for users/create:
router.get("/users/create", (req, res) => res.render("users/new-user"));

// POST route for users/create:
router.post("/users/create", (req, res) => {
    const { username, email, password, firstName, lastName, dateOfBirth, idCardNumber, idDriverLicense, address, isAgent, rentedCars } = req.body;
    User.findOne({ username })
      .then((userFromDB) => {
        if (!userFromDB) {
          User.create({ username, email, password, firstName, lastName, dateOfBirth, idCardNumber, idDriverLicense, address, isAgent, rentedCars })
          .then(() => res.redirect('/users'));
        } else {
          res.render("/users/create", { message: "It seems this user is already created." });
          return;
        }
      })
      .catch((err) => console.log(`Error while creating a new user: ${err}`));
  });

// GET all users from the database:
router.get("/users", (req, res) => {
    User.find()
      .then((usersFromDB) => res.render("users/users", { users: usersFromDB }))
      .catch((err) => console.log(`Error while getting users from the database: ${err}`));
  });

module.exports = router;