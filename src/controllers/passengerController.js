const passengerService= require('../services/passengerService');

const getPassengerBookings= async(req,res) =>{

    try {
        const bookings=await passengerService.getPassengerBookings(req.user_id);
        res.status(201).send({data: bookings,success: true,error: null,messsage: "retrieved passengern bookings"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const provideFeedback = async (req, res) => {
    try {
      const { bookingId, rating, feedback } = req.body;
      await passengerService.provideFeedback(req.user._id, bookingId, rating, feedback);
      //dont send res.send and res.status simultaneously-ERR_HTTP_HEADERS_SENT error once the header is modified it will not change
      // res.send({ message: 'Feedback submitted successfully' });
      res.status(201).send({success: true, error: null, message: "Feedback submitted successfully"});
  
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  module.exports = { getPassengerBookings, provideFeedback };