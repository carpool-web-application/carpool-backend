import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";
import {
  saveRide,
  fetchRides,
  fetchDriverRides,
  updateRideDetails,
  fetchNearbyRide,
  /* fetchOngoingRide, 
   getDriverRide, */
} from "../services/ride-service.js";
import setSuccessfullResponse from "../utils/successResponse.js";
import AppError from "../utils/AppError.js";

const createRide = catchAsyncFunction(async (request, response) => {
  const ridePayload = request.body;
  const ride = await saveRide(ridePayload);
  setSuccessfullResponse(ride, response);
});

const fetchAllRide = catchAsyncFunction(async (request, response) => {
  const rideParameter = request.query;
  const ride = await fetchRides(rideParameter);
  setSuccessfullResponse(ride, response);
});

const fetchRide = catchAsyncFunction(async (request, response) => {
  const rideParameter = request.params.rideId;
  const ride = await fetchDriverRides(rideParameter);
  setSuccessfullResponse(ride, response);
});

const fetchNearby = catchAsyncFunction(async (request, response, next) => {
  const requiredCoordinates = ["startLat", "startLon", "endLat", "endLon"];
  const invalidCoordinate = requiredCoordinates.some(
    (key) =>
      request.query[key] === undefined ||
      request.query[key] === "" ||
      !Number.isFinite(Number(request.query[key]))
  );
  const seats = Number(request.query.seats);
  const pickupTime = request.query.PickUpTime;
  const latitudeIsInvalid = [request.query.startLat, request.query.endLat].some(
    (latitude) => Math.abs(Number(latitude)) > 90
  );
  const longitudeIsInvalid = [
    request.query.startLon,
    request.query.endLon,
  ].some((longitude) => Math.abs(Number(longitude)) > 180);

  if (
    invalidCoordinate ||
    latitudeIsInvalid ||
    longitudeIsInvalid ||
    !Number.isInteger(seats) ||
    seats <= 0 ||
    !pickupTime ||
    !Number.isFinite(Date.parse(pickupTime)) ||
    Date.parse(pickupTime) <= Date.now()
  ) {
    return next(
      new AppError(
        "Valid coordinates, pickup time, and a positive whole number of seats are required",
        400
      )
    );
  }

  const ride = await fetchNearbyRide({
    startLat: Number(request.query.startLat),
    startLon: Number(request.query.startLon),
    endLat: Number(request.query.endLat),
    endLon: Number(request.query.endLon),
    seats,
    PickUpTime: pickupTime,
  });
  setSuccessfullResponse(ride, response);
});

/* const fetchDriverRide = catchAsyncFunction(async (request, response) => {
  const rideParameter = request.params.rideId;
  const ride = await getDriverRide(rideParameter);
  setSuccessfullResponse(ride, response);
}); */

/* const onGoingRide = catchAsyncFunction(async (request, response) => {
  const rideParameter = request.params.rideId;
  const ride = await fetchOngoingRide(rideParameter);
  setSuccessfullResponse(ride, response);
}); */

const updateRide = catchAsyncFunction(async (request, response) => {
  const rideParameter = request.params.rideId;
  const ride = await updateRideDetails(rideParameter, request.body);
  setSuccessfullResponse(ride, response);
});

export default {
  createRide,
  fetchAllRide,
  fetchRide,
  fetchNearby,
  updateRide,
  /* onGoingRide,  fetchDriverRide, */
};
