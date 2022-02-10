const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "User" },
    numberOfDays: Number,
    bookedCar: { type: Schema.Types.ObjectId, ref: "Cars" }
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;