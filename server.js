// Importing modules
import app from "./carpooling-app/app.js";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer(app);
// Creating the port
const port = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allows access from your React client
    methods: ["GET", "POST"],
    credentials: true, // Allows cookies and session information to be sent
  },
});

// MongoDB connection
mongoose
  .connect(process.env.MONGOdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Socket.io event listeners
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("send_message", (data) => {
    console.log(data);
  });

  socket.on("setup", (data) => {
    socket.join(data._id);
    socket.emit("connected");
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });

  socket.emit("message", { message: "Welcome to the WebSocket Server!" });
});

// Starting the server
server.listen(port, () => console.log(`Server listening at ${port}`));

process.on("SIGTERM", () => {
  console.log("Closing server gracefully...");
  io.close();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
// Exporting io
export { io };
