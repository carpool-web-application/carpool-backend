import {
  saveUser,
  getuser,
  removeuser,
  updateDetails,
  searchuser,
  getuserName,
  getuserDetails,
} from "../services/user-service.js";
import setSuccessfullResponse from "../utils/successResponse.js";
import AppError from "../utils/AppError.js";
import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";

export const post = catchAsyncFunction(async (request, response) => {
  const newUser = request.body;
  const savedUser = await saveUser(newUser);

  setSuccessfullResponse(savedUser, response);
});

export const index = catchAsyncFunction(async (request, response) => {
  const params = request;
  const users = await searchuser(params);

  setSuccessfullResponse(users, response);
});

export const login = catchAsyncFunction(async (request, response, next) => {
  const body = request.body;
  const user = await getuserDetails(body);
  if (!user) {
    return next(new AppError(401, "User not found or password incorrect"));
    //return response.status(401).send("User not found or password incorrect"); removed it for common error
  }
  request.body = user;
  next();
});

//define the method for rider searching
export const find = catchAsyncFunction(async (request, response) => {
  const id = request.params.id;
  const user = await getuser(id);
  setSuccessfullResponse(user, response);
});

export const findbyUserName = catchAsyncFunction(async (request, response) => {
  const id = request.params.riderId;
  const user = await getuserName(id);
  setSuccessfullResponse(user, response);
});

//define the method for reminder deletion
export const deleteUser = catchAsyncFunction(async (request, response) => {
  const id = request.params.id;
  const user = await removeuser(id);
  setSuccessfullResponse(user, response);
});

//define the method for reminder updation
export const updatuser = catchAsyncFunction(async (request, response) => {
  const id = request.params.userId;
  const body = request.body;
  const user = await updateDetails(id, body);

  setSuccessfullResponse(user, response);
});
