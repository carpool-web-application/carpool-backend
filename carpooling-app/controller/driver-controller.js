//import * as reminderService from './../services/reminder-service.js';
import {
  saveDriver,
  getDriver,
  removeDriver,
  updateDetails,
  searchDriver,
} from "../services/driver-service.js";
import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";
import setSuccessfullResponse from "../utils/successResponse.js";
//reminderService.save();

//define the method for reminder creation
/* export const post = async (request, response) => {
  try {
    const newDriver = request.body;
    const savedDriver = await saveDriver(newDriver);
    setSuccessfullResponse(savedDriver, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
}; */

//removed it for as merged it into Users

export const index = catchAsyncFunction(async (request, response) => {
  const params = {};
  const drivers = await searchDriver(params);
  setSuccessfullResponse(drivers, response);
});

//define the method for rider searching
export const find = catchAsyncFunction(async (request, response) => {
  const id = request.params.driverId;
  const driver = await getDriver(id);
  setSuccessfullResponse(driver, response);
});

//define the method for reminder deletion
export const deleteDriver = catchAsyncFunction(async (request, response) => {
  const id = request.params.DriverUserName;
  const driver = await removeDriver(id);
  setSuccessfullResponse(driver, response);
});

//define the method for reminder updation
export const updatedriver = catchAsyncFunction(async (request, response) => {
  const id = request.params.DriverUserName;
  const body = request.body;
  const driver = await updateDetails(id, body);

  setSuccessfullResponse(driver, response);
});
