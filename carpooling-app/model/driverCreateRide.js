import mongoose from "mongoose";

const driverCreateRides = new mongoose.Schema({
  driverOrderNumber: {
    type: Number,
  },
  driverId: {
    type: Number,
  },
  StartingLocation: {
    type: String,
    required: "The driver needs to set Starting Location",
  },
  Destination: {
    type: String,
    required: "The driver needs to set Destination",
  },
  Status: {
    type: String,
    required: "The driver needs to set seats available",
  },
  Seats: {
    type: Number,
    required: "The driver needs to set seats available",
  },
  Cost: {
    type: Number,
    required: "The driver needs to set seats available",
  },
  OriginLatitude: {
    type: String,
    //required: "The driver needs to set seats available",
  },
  OriginLongitude: {
    type: String,
    //required: "The driver needs to set seats available",
  },
  DestinationLatitude: {
    type: String,
    // required: "The driver needs to set seats available",
  },
  DestinationLongitude: {
    type: String,
    // required: "The driver needs to set seats available",
  },
});

const driverCreateRidesSchema = mongoose.model(
  "driverSetRides",
  driverCreateRides
);
export default driverCreateRidesSchema;
