const router = require("express").Router();

const User = require("../models/Users.model");
const Car = require("../models/Cars.model");
const Booking = require("../models/Bookings.model");
const { isLoggedOut, isLoggedIn, isAgent } = require("../middleware/route-guard");

// GET route to display the form to create a new booking
router.get('/bookings/create', (req, res, next) => {

  /*
  Car.find()
  .then(listOfCars => res.render('bookings/create', { listOfCars }))
  User.find()
  .then(listOfUsers => res.render('bookings/create', { listOfUsers }))
  .catch(err => console.log('Error retrieving cars list: ', err))
*/



  Car.find({}, function (req1, res1) {
    User.find({}, function (req2, res2) {
          res.render('bookings/create', { listOfCars: res1, listOfUsers: res2 });
      });
    });
});

// POST route to submit the form to create a booking
router.post('/bookings/create', (req, res, next) => {
  const { client, numberOfDays, bookedCar } = req.body;

  Booking.create({ client, numberOfDays, bookedCar })
    .then(dbBooking => {
      return User.findByIdAndUpdate(client, { $push: { bookings: dbBooking._id } });
    })
    .then(() => res.redirect('/bookings'))
    .catch(err => {
      console.log(`Error while creating the booking in the DB: ${err}`);
      next(err);
    });
});

// GET route to display all the bookings
router.get('/bookings', (req, res, next) => {

  Booking.find()
    .populate('client bookedCar')
    .then(dbBookings => {
      res.render('bookings/bookings', { bookings: dbBookings });
    })
    .catch(err => {
      console.log(`Err while getting the bookings from the DB: ${err}`);
      next(err);
    });
});

// GET route for displaying the booking details page:
router.get('/bookings/:bookingId/edit', async (req, res, next) => {
  try {
    const { bookingId } = req.params; 

    const allUsers = await User.find();

    const allCars = await Car.find();
    
    Booking.findById(bookingId)
        .populate('client bookedCar')
        .then(foundBooking => res.render('bookings/edit', { foundBooking, allUsers, allCars }))
        .catch(err => {
          console.log(`Err while getting a single booking from the  DB: ${err}`);
          next(err);
        });

  } catch (error) {
    console.log('error :>> ', error);
  }
});
  
// POST route to actually make updates on user profile:
router.post('/bookings/:bookingId/edit', (req, res, next) => {
  const { bookingId } = req.params;
  const { client, numberOfDays, bookedCar } = req.body;
 
  Booking.findByIdAndUpdate(bookingId, { client, numberOfDays, bookedCar })
    .then(() => res.redirect(`/bookings`))
    .catch(err => console.log('Error while retrieving user details: ', err));
});

module.exports = router;
