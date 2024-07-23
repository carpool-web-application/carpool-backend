import mongoose from "mongoose";

const riderUpdated = new mongoose.Schema({
  riderName: {
    type: String,
    required: "the rider is required to give his name ",
  },
  riderId: {
    type: Number,
  },
  seats: {
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
});

const riderUpdatedSchema = mongoose.model("riderUpdated", riderUpdated);
export default riderUpdatedSchema;
