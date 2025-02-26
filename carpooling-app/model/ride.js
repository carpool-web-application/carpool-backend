import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const rideSchema = new mongoose.Schema(
  {
    rideId: {
      type: String,
      default: uuidv4, //required: 'The title field is required.'
    },
    driver: {
      type: String,
      ref: "userAuths",
      required: true,
    },
    StartingLocation: {
      type: String,
      default: null, // required: 'Starting Location is required.'
    },
    Destination: {
      type: String,
      default: null, //required: 'Destination is required.'
    },
    PickUpTime: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["available", "full", "ongoing", "completed", "cancelled"],
      default: "available",
    },
    Cost: {
      type: Number,
      default: null, // required: 'Number of Seats is required.'
    },
    OriginLatitude: {
      type: String,
      default: null, //required: 'Number of Seats is required.'
    },
    OriginLongitude: {
      type: String,
      default: null, // required: 'Number of Seats is required.'
    },
    DestinationLatitude: {
      type: String,
      default: null, //required: 'Number of Seats is required.'
    },
    DestinationLongitude: {
      type: String,
      default: null, // required: 'Number of Seats is required.'
    },
    Availableseats: {
      type: Number,
      default: null, // required: 'Number of Seats is required.'
    },
  },
  { timestamps: true }
);
const rides = mongoose.model("Rides", rideSchema);

export default rides;
