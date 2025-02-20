//import * as reminderService from './../services/reminder-service.js';
import {
  saveRiderOrder,
  getRiderOrder,
  removeRiderOrder,
  updateDetails,
  searchRiderOrder,
  getDriverOrderNumberReq,
} from "../services/riderOrder-service.js";
import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";
//reminderService.save();

//define the method for reminder creation
export const post = catchAsyncFunction(async (request, response) => {
  const newRiderOrder = request.body;
  const savedRiderOrder = await saveRiderOrder(newRiderOrder);
  setSuccessfulResponse(savedRiderOrder, response);
});

export const index = catchAsyncFunction(async (request, response) => {
  const params = {};
  const riderOrders = await searchRiderOrder(params);
  setSuccessfulResponse(riderOrders, response);
});

//define the method for riderOrder searching
export const find = catchAsyncFunction(async (request, response) => {
  const id = request.params.UserId;
  const riderOrder = await getRiderOrder(id);
  setSuccessfulResponse(riderOrder, response);
});

export const findbyOrderNumber = async (request, response) => {
  try {
    const id = request.params.DriverOrderNumber;
    const riderOrder = await getDriverOrderNumberReq(id);
    setSuccessfulResponse(riderOrder, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for reminder deletion
export const deleteRiderOrder = async (request, response) => {
  try {
    const id = request.params.orderId;
    const riderOrder = await removeRiderOrder(id);
    setSuccessfulResponse(riderOrder, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for reminder updation
export const updateRiderOrder = async (request, response) => {
  try {
    const id = request.params.orderId;
    const body = request.body;
    const riderOrder = await updateDetails(id, body);

    setSuccessfulResponse(riderOrder, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define when the request is successful
const setSuccessfulResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

//define the error response
const setErrorResponse = (err, response) => {
  response.status(500);
  response.status(404);
  response.json({
    error: {
      message: err,
    },
  });
};
