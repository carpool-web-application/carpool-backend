import mongoose from "mongoose";

const driverOrderSchema = new mongoose.Schema(
  {
    ride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    riderOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RiderOrder",
      },
    ], // ✅ Links all rider orders for this ride
    totalFareCollected: {
      type: Number,
      default: 0,
    }, // ✅ Aggregated fare from all accepted riders
    totalSeatsFilled: {
      type: Number,
      default: 0,
    }, // ✅ Number of booked seats in the ride
    status: {
      type: String,
      enum: ["ongoing", "completed", "cancelled"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

const DriverOrder = mongoose.model("DriverOrder", driverOrderSchema);

export default DriverOrder;
