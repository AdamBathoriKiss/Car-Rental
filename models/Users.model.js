// models/Users.js
// Model for users and administrators 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    lowercase: true,
    trim: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required.']
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required.']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required.']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date Of Birth is required.']
  },
  idCardNumber: {
    type: String,
    required: [true, 'ID Card Number is required.'],
    trim: true,
    unique: true
  },
  idDriverLicense: {
    type: String,
    required: [true, 'Driver License ID Number is required.'],
    trim: true,
    unique: true
  },
  address: String,
  isAgent: {
    type: Boolean,
    default: false
  },
  rentedCars: [{ type: Schema.Types.ObjectId, ref: 'Cars' }]
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;