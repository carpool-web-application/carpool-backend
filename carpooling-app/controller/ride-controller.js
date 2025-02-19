import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";
import {
  saveRide,
  fetchRides,
  fetchDriverRides,
  updateRideDetails,
} from "../services/ride-service.js";
import setSuccessfullResponse from "../utils/successResponse.js";

const createRide = catchAsyncFunction(async (request, response) => {
  const ridePayload = request.body;
  const ride = await saveRide(ridePayload);
  setSuccessfullResponse(ride, response);
});

const fetchAllRide = catchAsyncFunction(async (request, response) => {
  const rideParameter = {};
  const ride = await fetchRides(rideParameter);
  setSuccessfullResponse(ride, response);
});

const fetchRide = catchAsyncFunction(async (request, response) => {
  const rideParameter = request.params.rideId;
  const ride = await fetchDriverRides(rideParameter);
  setSuccessfullResponse(ride, response);
});

const updateRide = catchAsyncFunction(async (request, response) => {
  const rideParameter = request.params.rideId;
  const ride = await updateRideDetails(rideParameter, requestPayload);
  setSuccessfullResponse(ride, response);
});

export default {
  createRide,
  fetchAllRide,
  fetchRide,
  updateRide,
};
