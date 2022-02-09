const { Router } = require('express');
const router = new Router();
const mongoose = require('mongoose');
const User = require('../models/Users.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const bcryptjs = require('bcryptjs');
const { rawListeners } = require('../models/Users.model');
const saltRounds = 10;

// GET route to display the signup form to users:
router.get('/signup', isLoggedOut, (req, res) => res.render('auth/signup'));

// POST route to process form data:
router.post('/signup', (req, res, next) => {
    const { username, email, password, firstName, lastName, dateOfBirth, idCardNumber, idDriverLicense, address } = req.body;
   
    bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          username,
          email,
          passwordHash: hashedPassword,
          firstName,
          lastName,
          dateOfBirth,
          idCardNumber,
          idDriverLicense,
          address
        });
      })
      .then(userFromDB => {
        res.redirect('/userProfile');
      })
      .catch(error => next(error));
});

// GET route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));

// POST login route ==> to process form data
router.post('/login', (req, res, next) => {

  console.log('SESSION =====> ', req.session);

  const { username, password } = req.body;
 
  if (username === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter your username and password to login.'
    });
    return;
  }
 
  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Username is not registered.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        res.redirect('/userProfile');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

// GET logout:
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/') 
  });
});


// GET route to user proile page:
router.get('/userProfile', isLoggedIn, (req, res) => {
  res.render('users/user-profile', { userInSession: req.session.currentUser });
});

// GET route to display the form to update user profile:
router.get('/users/:userId/edit-profile', isLoggedIn, (req, res, next) => {
  const { userId } = req.params;

  console.log(req.params);
 
  User.findById(userId)
    .then(userToEdit => res.render('users/edit-profile', { user: userToEdit }))
    .catch(err => console.log('Error while retrieving user details: ', err));
});

// POST route to actually make updates on user profile:
router.post('/users/:userId/edit-profile', isLoggedIn, (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, dateOfBirth, idCardNumber, idDriverLicense, address, email } = req.body;
 
  User.findByIdAndUpdate(userId, { firstName, lastName, dateOfBirth, idCardNumber, idDriverLicense, address, email })
    .then(() => res.redirect(`/userProfile`))
    .catch(err => console.log('Error while retrieving user details: ', err));
});



module.exports = router;