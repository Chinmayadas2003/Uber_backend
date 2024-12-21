const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const driverRoutes = require('./routes/driverRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const { redisClient } = require('./utils/redisClient');
const mongoose = require('mongoose');
const cors= require('cors');
const locationService = require('./services/LocationService');

dotenv.config();

const app = express();

// Create HTTP server for WebSocket integration
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server,{
  cors:{
    origin: "*",
    methods:["GET","POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static assets from 'public'

// Ensure environment variables are properly set
if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error('Error: Missing required environment variables (MONGO_URI, PORT)');
  process.exit(1);
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes(io));
app.use('/api/drivers', driverRoutes);
app.use('/api/passengers', passengerRoutes(io));

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('registerDriver', async (driverId) => {
      await locationService.setDriverSocket(driverId, socket.id);
      console.log("set driver socket");
    });

  
    socket.on('disconnect', async () => {
      console.log('A user disconnected');
      const driverId = await locationService.getDriverSocket(`driver:${socket.id}`);
      if (driverId) {
        await redisClient.del(`driver:${driverId}`);
      }
    });
});