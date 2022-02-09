// models/Cars.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: String,  
  model: String,
  yearOfProd: Number,
  engine: String,
  transmission: String,
  fuel: String,
  extras: String,
  rentalCost: Number,
  status: String,
  imageUrl: {type: String},
  description: String
});

const Cars = mongoose.model('Cars', carSchema);

module.exports = Cars;