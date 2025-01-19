// Importing modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import route from "../carpooling-app/routes/index.js";
import dotenv from "dotenv";
dotenv.config();

const carpooling = express();

carpooling.use(cors());
carpooling.use(express.json());

// Use bodyParser middleware for parsing URL-encoded data
carpooling.use(bodyParser.urlencoded({ extended: true }));

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGOdb, {
    useNewUrlParser: true, // Add useNewUrlParser option
    useUnifiedTopology: true, // Add useUnifiedTopology option
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

route(carpooling);

export default carpooling;
