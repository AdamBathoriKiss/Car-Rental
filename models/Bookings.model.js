// models/Bookings.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookedCars: [{type: Schema.Types.ObjectId, ref: Cars}],
    bookingUsers: [{type: Schema.Types.ObjectId, ref: Users}],
    startDate: Date,
    endDate: Date,
});

const Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings;


