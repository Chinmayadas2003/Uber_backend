const Booking = require('../models/booking');
const passengerRepository = require('../repositories/passengerRepository');
const bookingRepository=require('../repositories/bookingRepository');

const getPassengerBookings = async (passengerId) => {
  // Call repository function
  console.log(passengerRepository);
  const passengerBookings = await passengerRepository.findPassengerById(passengerId);
  if (!passengerBookings) {
    throw new Error(`No bookings found for passenger with ID: ${passengerId}`);
  }
  return passengerBookings;
};

module.exports = { getPassengerBookings };
const provideFeedback = async (passengerId, bookingId, rating, feedback) => {
  const booking = await bookingRepository.findBooking({ _id: bookingId, passenger: passengerId });
  if (!booking) throw new Error('Booking not found');
  booking.rating = rating;
  booking.feedback = feedback;
  //can do it in repo layer also like previous project
  await booking.save();
};

module.exports = { getPassengerBookings, provideFeedback };