import Ride from "../model/ride.js";
import DriverOrder from "../model/driverOrder.js";

export const saveRide = async (ridePayload) => {
  //return value of asyn func is promise
  const ride = new Ride(ridePayload);
  return ride.save();
};

export const fetchRides = async (ridePayload) => {
  //return value of asyn func is promise
  const ride = await ride.find().exec();
  return ride;
};

export const fetchDriverRides = async (rideId) => {
  const ride = await ride.find({ rideId: rideId }).populate("driver");
  return ride;
};

export const updateRideDetails = async (rideParameter, requestPayload) => {
  const ride = await ride.findOneAndUpdate(
    { riderId: rideParameter },
    { $set: { requestPayload } }
  );

  return ride;
};
