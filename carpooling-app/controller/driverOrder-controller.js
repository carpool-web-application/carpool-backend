//import * as reminderService from './../services/reminder-service.js';
import {
  saveDriverOrder,
  getDriverOrder,
  removeDriverOrder,
  updateDetails,
  searchDriverOrder,
  getDriverOrderNumberReq,
} from "../services/driverOrder-service.js";
import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";
import setSuccessfullResponse from "../utils/successResponse.js";
//reminderService.save();

//define the method for reminder creation
export const post = catchAsyncFunction(async (request, response) => {
  const newDriverOrder = request.body;
  const savedDriverOrder = await saveDriverOrder(newDriverOrder);
  setSuccessfullResponse(savedDriverOrder, response);
});

export const index = catchAsyncFunction(async (request, response) => {
  const params = {};
  const driverOrders = await searchDriverOrder(params);
  setSuccessfullResponse(driverOrders, response);
});

//define the method for driverOrder searching
export const find = catchAsyncFunction(async (request, response) => {
  const id = request.params.UserId;
  const driverOrder = await getDriverOrder(id);
  setSuccessfullResponse(driverOrder, response);
});

export const findbyOrderNumber = catchAsyncFunction(
  async (request, response) => {
    const id = request.params.DriverOrderNumber;
    const driverOrder = await getDriverOrderNumberReq(id);
    setSuccessfullResponse(driverOrder, response);
  }
);

//define the method for reminder deletion
export const deleteDriverOrder = catchAsyncFunction(
  async (request, response) => {
    const id = request.params.orderId;
    const driverOrder = await removeDriverOrder(id);
    setSuccessfullResponse(driverOrder, response);
  }
);

//define the method for reminder updation
export const updateDriverOrder = catchAsyncFunction(
  async (request, response) => {
    const id = request.params.orderId;
    const body = request.body;
    const driverOrder = await updateDetails(id, body);

    setSuccessfullResponse(driverOrder, response);
  }
);
