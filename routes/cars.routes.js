const router = require("express").Router();

const User = require("../models/Users.model");
const Car = require("../models/Cars.model");
const fileUploader = require('../config/cloudinary.config');
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");

// GET route for cars/create:
router.get('/cars/create', (req, res, next) => {
  User.find()
  .then(listOfUsers => res.render('cars/create', { user: listOfUsers }))
  .catch(err => console.log('Error retrieving cars list: ', err))
});

// POST route for cars/create:
// Image upload:

router.post('/cars/create', fileUploader.single('car-cover-image'), (req, res, next) => {
  const { make, model, yearOfProd, engine, transmission, fuel, extras, rentalCost, status, imageUrl, description } = req.body;
  console.log(req.body);

  Car.create({make, model, yearOfProd, engine, transmission, fuel, extras, rentalCost, status, imageUrl: req.file.path, description })
  .then((createdCar) => {
    console.log(createdCar)
    res.redirect('/cars')})
  // .catch(err => res.render("cars/create"))

  .catch(err => console.log('Error while creating a new car: ', err))
});

// GET all cars from the database:
router.get("/cars", isLoggedIn, (req, res) => {
if(req.session){
    Car.find()
    .then((carsFromDB) => res.render("cars/cars", { cars: carsFromDB }))
    .catch((err) => console.log(`Error while getting cars from the database: ${err}`));
    }
    else {
      res.redirect("/login");
    }}); 

// GET route to display the details of a specific car:
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
    // .populate('engine')
    .then(carToEdit => res.render('cars/edit', { car: carToEdit }))
    .catch(err => console.log('Error while retrieving car details: ', err));
});

// POST route to actually make updates on a specific car
router.post('/cars/:carId/edit', fileUploader.single('car-cover-image'), (req, res, next) => {
  const { carId } = req.params;
  const { make, model, yearOfProd, engine, transmission, fuel, extras, rentalCost, status, existingImage, description } = req.body;
console.log("Testing " + existingImage);
console.log(req.file);
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = existingImage;
  }
 console.log(imageUrl);
  Car.findByIdAndUpdate(carId, { make, model, yearOfProd, engine, transmission, fuel, extras, rentalCost, status, imageUrl, description } , {new: true})
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