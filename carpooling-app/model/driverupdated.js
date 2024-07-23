import mongoose from "mongoose";

const driverUpdatedSchema = new mongoose.Schema({
  DriverName: {
    type: String,
    required: "This is required ",
  },
  DriverID: {
    type: Number,
  },
  vehicleName: {
    type: String,
    required: "You are required to enter vehicle name",
  },
  Seats: {
    type: Number,
    required: "You are supposed to enter the number of seats",
  },
});

const driverUpdated = mongoose.model("driverUpdated", driverUpdatedSchema);
export default driverUpdated;
