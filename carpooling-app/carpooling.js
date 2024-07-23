  // Importing modules
  import express from "express";
  import mongoose from "mongoose";
  import cors from 'cors';
  import bodyParser from 'body-parser'; 
  import http from 'http'; 
  import { Server } from 'socket.io'; 
  import route from '../carpooling-app/routes/index.js'

  const carpooling = express();

  carpooling.use(cors());
  carpooling.use(express.json());

  // Use bodyParser middleware for parsing URL-encoded data
  carpooling.use(bodyParser.urlencoded({ extended: true }));

  // Connecting to MongoDB
  mongoose.connect('mongodb://127.0.0.1/carpool', {
    useNewUrlParser: true, // Add useNewUrlParser option
    useUnifiedTopology: true, // Add useUnifiedTopology option
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  // Create HTTP server
/* const server = http.createServer(carpooling);

// Initialize socket.io
const io = new Server(server);

// Socket.io event listeners
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle custom events here
  socket.on('notification', (data) => {
    console.log('Notification received:', data);
    // Handle the notification event here
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
}); */



  route(carpooling);

  export default carpooling;
