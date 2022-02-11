const router = require("express").Router();

const Car = require("../models/Cars.model");
const User = require("../models/Users.model");
const Booking = require("../models/Bookings.model");
const { isLoggedOut, isLoggedIn, isAgent } = require("../middleware/route-guard");

// GET route to display the form to create a new booking:
router.get('/bookings/create', isLoggedIn, (req, res, next) => {
  Car.find({}, function (req1, res1) {
    User.find({}, function (req2, res2) {
          res.render('bookings/create', { listOfCars: res1, listOfUsers: res2 });
    });
  });
});

// POST route to submit the form to create a booking:
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

// GET route to display all the bookings:
router.get("/bookings", isLoggedIn, async (req, res) => {
  try {
    if(req.session) {
      const bookingsFromDB = await Booking.find()
      .populate('client bookedCar')
      res.render("bookings/bookings", { bookings: bookingsFromDB })
    }
    else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(`Error while getting bookings from the database: ${error}`);
  }
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
    console.log('error: ', error);
  }
});
  
// POST route to actually make updates on booking:
router.post('/bookings/:bookingId/edit', (req, res, next) => {
  const { bookingId } = req.params;
  const { client, numberOfDays, bookedCar } = req.body;
 
  Booking.findByIdAndUpdate(bookingId, { client, numberOfDays, bookedCar })
    .then(() => res.redirect(`/bookings`))
    .catch(err => console.log('Error while retrieving user details: ', err));
});

// POST route to delete a booking from the database:
router.post('/bookings/:bookingId/delete', (req, res, next) => {
  const { bookingId } = req.params;
 
  Booking.findByIdAndDelete(bookingId)
    .then(() => res.redirect('/bookings'))
    .catch(error => next(error));
});

module.exports = router;