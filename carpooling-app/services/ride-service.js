import Ride from "../model/ride.js";
import mongoose from "mongoose";

export const saveRide = async (ridePayload) => {
  //return value of asyn func is promise
  const ride = new Ride({
    ...ridePayload,
    driver: new mongoose.Types.ObjectId(ridePayload.driver),
  });
  return ride.save();
};

export const fetchRides = async (ridePayload) => {
  const query = {};
  if (ridePayload.driverId) {
    query.driver = ridePayload.driverId;
  }
  if (ridePayload.status) {
    query.status = ridePayload.status;
  }
  if (ridePayload.driverId) {
    query.driver = ridePayload.driverId;
  }
  //return value of asyn func is promise
  const ride = await Ride.find(query)
    .populate("driver", "-userPassword -driverDetails")
    .exec();
  return ride;
};

/* export const fetchOngoingRide = async (driver) => {
  const ride = await Ride.findOne({
    driver: driver,
    status: { $eq: "available" },
  }).exec();
  return ride;
}; */

export const fetchDriverRides = async (rideId) => {
  const ride = await Ride.find({ rideId: rideId }).populate("driver");
  return ride;
};

/* export const getDriverRide = async (rideId) => {
  const ride = await Ride.find({ driver: rideId }).populate("driver");
  console.log(ride);
  return ride;
};
 */
export const updateRideDetails = async (rideParameter, requestPayload) => {
  const ride = await Ride.findOneAndUpdate(
    { rideId: rideParameter },
    { $set: requestPayload }
  );
  return ride;
};
