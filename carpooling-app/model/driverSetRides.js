import mongoose from "mongoose";

const driverSetRides = new mongoose.Schema({
  driverId: {
    type: Number,
  },
  rideId: {
    type: Number,
  },
  Seats: {
    type: Number,
    required: "The driver needs to set seats available",
  },
});

const driverSetRidesSchema = mongoose.model("driverSetRides", driverSetRides);
export default driverSetRidesSchema;
