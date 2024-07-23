import mongoose from "mongoose";

const riderCreateRides = new mongoose.Schema({
  riderId: {
    type: Number,
  },
  origin: {
    type: String,
    required: "You are required to enter origin",
  },
  destination: {
    type: String,
    required: "You are required to enter destination",
  },
  pickupTime: {
    type: Date,
    required: "You are required to enter pickupTime",
  },
  seats: {
    type: Number,
  },
});

const riderRideSchema = mongoose.model("riderUpdated", riderCreateRides);
export default riderRideSchema;
