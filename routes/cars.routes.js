const router = require("express").Router();

const User = require("../models/User.model");
const Car = require("../models/Car.model");

// GET route for cars/create:
router.get('/cars/create', (req, res, next) => {
  User.find()
  .then(listOfUsers => res.render('cars/new-car', { user: listOfUsers }))
  .catch(err => console.log('Error retrieving users list: ', err))
});

// POST route for cars/create:
router.post('/cars/create', (req, res, next) => {
  const { make, model, yearOfProd, engine, transmission, fuel, extras, rentalCost, status, startDate, endDate } = req.body;

  Car.create({make, model, yearOfProd, engine, transmission, fuel, extras, rentalCost, status, startDate, endDate  })
  .then(() => res.redirect('/cars'))
  .catch(err => res.render("cars/create"))
});

// GET all cars from the database:
router.get("/cars", (req, res) => {
    Car.find()
      .then((carsFromDB) => res.render("cars/cars", { cars: carsFromDB }))
      .catch((err) => console.log(`Error while getting cars from the database: ${err}`));
  });

// ET route to display the details of a specific car:
router.get('/cars/:carId', (req, res, next) => {
  const { carId } = req.params;

  Car.findById(carId)
  .populate('engine')
  .then(theCar => res.render('cars/car-details.hbs', { car: theCar }))
  .catch(err => console.log('Error while retrieving car details: ', err))
});

// GET route to display the form to update a specific car
router.get('/cars/:carId/edit', (req, res, next) => {
  const { carId } = req.params;
 
  Car.findById(carId)
    .populate('engine')
    .then(carToEdit => res.render('cars/edit-car', { car: carToEdit }))
    .catch(err => console.log('Error while retrieving car details: ', err));
});

// POST route to actually make updates on a specific car
router.post('/cars/:carId/edit', (req, res, next) => {
  const { carId } = req.params;
  const { make, model, yearOfProd, engine, transmission, fuel, extras, rentalCost, status, startDate, endDate } = req.body;
 
  Car.findByIdAndUpdate(carId, { make, model, yearOfProd, engine, transmission, fuel, extras, rentalCost, status, startDate, endDate })
    .then(() => res.redirect(`/cars`))
    .catch(err => console.log('Error while retrieving car details: ', err));
});

// POST route to delete a car from the database:
router.post('/cars/:carId/delete', (req, res, next) => {
  const { carId } = req.params;
 
  Car.findByIdAndDelete(carId)
    .then(() => res.redirect('/cars'))
    .catch(error => next(error));
});

module.exports = router;