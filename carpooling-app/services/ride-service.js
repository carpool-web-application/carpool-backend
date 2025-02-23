import Ride from "../model/ride.js";

export const saveRide = async (ridePayload) => {
  //return value of asyn func is promise
  const ride = new Ride(ridePayload);
  return ride.save();
};

export const fetchRides = async (ridePayload) => {
  //return value of asyn func is promise
  const ride = await Ride.find().exec();
  return ride;
};

export const fetchOngoingRide = async (driver) => {
  const ride = await Ride.findOne({
    driver: driver,
    status: { $ne: "ongoing" },
  }).exec();
  return ride;
};

export const fetchDriverRides = async (rideId) => {
  const ride = await Ride.find({ rideId: rideId }).populate("driver");
  return ride;
};

export const updateRideDetails = async (rideParameter, requestPayload) => {
  const ride = await Ride.findOneAndUpdate(
    { riderId: rideParameter },
    { $set: { requestPayload } }
  );

  return ride;
};
