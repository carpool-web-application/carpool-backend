//Importing reminders.js
import app from './carpooling-app/carpooling.js';
import http from 'http'; 
import { Server } from 'socket.io'; 

const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allows access from your React client
    methods: ["GET", "POST"],
    credentials: true // Allows cookies and session information to be sent
  }
});

// Socket.io event listeners
io.on('connection', (socket) => {
  console.log('A user connected ' + socket.id);


  socket.on("send_message" , (data) => {
    console.log(data);
  })

  socket.on('setup', (data) => {
    socket.join(data._id);
    socket.emit("connected");
  })
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected' + socket.id);
  });

  socket.emit('message', { message: 'Welcome to the WebSocket Server!' });
});
//creating the port
const port = 9000;
//starting the server value and listening
server.listen(port, () => console.log(`server listening at ${port}`));
/* server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }); */
export {io};