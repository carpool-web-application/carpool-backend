import { timeStamp } from "console";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const riderReqSchema = new mongoose.Schema(
  {
    RequestId: {
      type: String,
      default: uuidv4,
    },
    ride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    /*  DriverPostStatus: {
    type: String,
    default: null, 
  }, removed as it is taking from the driver rides*/
    CommuteStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    seatsRequested: {
      type: String,
      required: true,
    },
    OriginLatitude: {
      type: String,
      default: null,
    },
    OriginLongitude: {
      type: String,
      default: null,
    },
    DestinationLatitude: {
      type: String,
      default: null,
    },
    DestinationLongitude: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
const riderRequest = mongoose.model("riderRequest", riderReqSchema);

export default riderRequest;
