// models/Users.js
// Model for users and administrators 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  passwordHash: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  idCardNumber: String,
  idDriverLicense: String,
  address: String,
  isAgent: Boolean,
  rentedCars: [{ type: Schema.Types.ObjectId, ref: 'Cars' }]
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;