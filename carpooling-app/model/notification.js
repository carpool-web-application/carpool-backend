import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const notificationModel = new mongoose.Schema(
  {
    notificationId: {
      type: String,
      default: uuidv4,
    },
    userId: {
      // Add this field to link notification to a specific user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["approval", "rejection", "ride_update", "system"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
    },
    relatedRideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rides",
      required: false,
    },
    additionalDetails: {
      rideDate: Date,
      departureTime: Date,
      pickupLocation: String,
      dropoffLocation: String,
    },
  },
  { timestamps: true }
);

const notificationSchema = mongoose.model("Notification", notificationModel);

export default notificationSchema;
