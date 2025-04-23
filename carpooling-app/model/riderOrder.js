import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const riderOrderSchema = new mongoose.Schema(
  {
    ride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    seatsBooked: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["completed", "cancelled"],
      default: "completed",
    },
    riderRated: {
      type: Boolean,
      default: false,
    }, // ✅ Rider rating flag
    driverRated: {
      type: Boolean,
      default: false,
    }, // ✅ Driver rating flag
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const riderOrder = mongoose.model("RiderOrders", riderOrderSchema);

export default riderOrder;
