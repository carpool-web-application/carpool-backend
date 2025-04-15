import {
  saveUser,
  getuser,
  removeuser,
  updateDetails,
  searchuser,
  getuserName,
  getuserDetails,
  resetLink,
  resetPassword,
} from "../services/user-service.js";
import setSuccessfullResponse from "../utils/successResponse.js";
import AppError from "../utils/AppError.js";
import { catchAsyncFunction } from "../utils/catchAsyncFunction.js";
import { nextTick } from "process";
import sendEmail from "../utils/notificationSetup.js";

export const post = catchAsyncFunction(async (request, response, next) => {
  const newUser = request.body;

  const savedUser = await saveUser(newUser, next);
  if (!savedUser) {
    return next(new AppError(404, "User is not created"));
  }

  const sendNotification = await sendEmail(
    savedUser.userEmail,
    `User Account Created ${savedUser.userEmail}`,
    `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
    <h2 style="color: #007bff;">Welcome to Our Platform 🎉</h2>
    <p>Dear User,</p>
    <p>You have been successfully onboarded to our platform.</p>
    <p>You can now log in, explore available features, and get started with our services.</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p>Thank you and welcome aboard!<br>— The Team</p>
  </div>
`
  );
  setSuccessfullResponse(savedUser, response);
});

export const index = catchAsyncFunction(async (request, response) => {
  const params = request;
  const users = await searchuser(params);

  setSuccessfullResponse(users, response);
});

export const passwordResetLink = catchAsyncFunction(
  async (request, response) => {
    const body = request.body;
    const users = await resetLink(body);

    setSuccessfullResponse(users, response);
  }
);

export const passwordReset = catchAsyncFunction(async (request, response) => {
  const body = request.body;
  const users = await resetPassword(body);

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
  const id = request.params.userId;
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
