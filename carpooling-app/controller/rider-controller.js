//import * as reminderService from './../services/reminder-service.js';
import {
  saveRider,
  getRider,
  removeRider,
  updateDetails,
  searchRider,
} from "../services/rider-service.js";
import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";
import setSuccessfullResponse from "../utils/successResponse.js";
//reminderService.save();

//define the method for reminder creation
export const post = catchAsyncFunction(async (request, response) => {
  const newRider = request.body;
  const savedRider = await saveRider(newRider);
  setSuccessfullResponse(savedRider, response);
});

export const index = catchAsyncFunction(async (request, response) => {
  const params = {};
  const riders = await searchRider(params);
  setSuccessfullResponse(riders, response);
});

//define the method for rider searching
export const find = catchAsyncFunction(async (request, response) => {
  const id = request.params.RiderUserName;
  const rider = await getRider(id);
  setSuccessfullResponse(rider, response);
});

//define the method for reminder deletion
export const deleteRider = catchAsyncFunction(async (request, response) => {
  const id = request.params.id;
  const rider = await removeRider(id);
  setSuccessfullResponse(rider, response);
});

//define the method for reminder updation
export const updateRider = catchAsyncFunction(async (request, response) => {
  const id = request.params.RiderUserName;
  const body = request.body;
  const rider = await updateDetails(id, body);

  setSuccessfullResponse(rider, response);
});
/* 
//define when the request is successful
const setSuccessfullResponse = (obj, response) => {
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
 removed due to HOC and resuable component*/
