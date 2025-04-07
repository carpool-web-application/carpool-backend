import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";
import setSuccessfullResponse from "../utils/successResponse.js";
import {
  saveRiderOrderReq,
  getRiderReq,
  removeRiderOrderReq,
  updateDetails,
  searchRiderOrderReq,
  getDriverOrderNumberReq,
  getRiderOrderDetails,
  requestDecision,
  getPendingRide,
} from "../services/riderOrderReq-service.js";
//reminderService.save();
import { io } from "../../server.js";

//define the method for reminder creation
export const post = catchAsyncFunction(async (request, response) => {
  const newRiderOrder = request.body;
  const savedRiderOrder = await saveRiderOrderReq(newRiderOrder);
  io.emit("approval_notification", {
    orderNumber: savedRiderOrder.DriverOrderNumber,
    riderId: savedRiderOrder.RiderId,
    message: "New rider Request approve or reject",
  });
  setSuccessfullResponse(savedRiderOrder, response);
});

export const index = catchAsyncFunction(async (request, response) => {
  const params = {};
  const riderOrders = await searchRiderOrderReq(params);
  setSuccessfullResponse(riderOrders, response);
});

//define the method for riderOrder searching
export const find = catchAsyncFunction(async (request, response) => {
  const RiderId = request.params.UserId;
  const riderReq = await getRiderReq(RiderId);
  setSuccessfullResponse(riderReq, response);
});

export const findPendingRide = catchAsyncFunction(async (request, response) => {
  const RiderId = request.params.RequestId;
  const riderReq = await getPendingRide(RiderId);
  setSuccessfullResponse(riderReq, response);
});

export const getPastRides = catchAsyncFunction(async (request, response) => {
  const rider = request.params.RiderId;
  const riderOrder = await getRiderOrderDetails(rider);
  setSuccessfullResponse(riderOrder, response);
});

export const findbyOrderNumber = catchAsyncFunction(
  async (request, response) => {
    const id = request.params.DriverOrderNumber;
    const riderOrder = await getDriverOrderNumberReq(id);
    response.status(200).json(riderOrder);
  }
);

//define the method for reminder deletion
export const deleteRiderOrder = catchAsyncFunction(
  async (request, response) => {
    const id = request.params.id;
    const riderOrder = await removeRiderOrderReq(id);
    setSuccessfullResponse(riderOrder, response);
  }
);

//define the method for reminder updation
export const updateRiderOrder = catchAsyncFunction(
  async (request, response) => {
    const id = request.params.RiderId;
    const body = request.body;
    const riderOrder = await updateDetails(id, body);

    setSuccessfullResponse(riderOrder, response);
  }
);

export const updateRideRequest = catchAsyncFunction(
  async (request, response) => {
    const requestPayload = request.body;
    const rideRequest = await requestDecision(
      request.params.RideRequestId,
      requestPayload
    );
    setSuccessfullResponse(rideRequest, response);
  }
);
