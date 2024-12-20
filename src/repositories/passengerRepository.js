const User = require('../models/user');
const Booking= require('../models/booking')

// Function to find a passenger by ID
const findPassengerById = async (passengerId) => {
  return await Booking.findOne({ _id: passengerId, role: 'passenger' });
};

module.exports = { findPassengerById };