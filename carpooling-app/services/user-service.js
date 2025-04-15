import userSchema from "../model/user.js";
import AppError from "../utils/AppError.js";
import crypto from "crypto";
import sendEmail from "../utils/notificationSetup.js";

export const saveUser = async (newUser, next) => {
  //return value of asyn func is promise
  const fetchUser = await userSchema
    .findOne({ userName: newUser.userName })
    .exec();
  if (fetchUser) {
    return next(new AppError("User already exists", 401));
  }

  const user = new userSchema(newUser);
  const saveUser = await user.save();

  return saveUser;
};

export const getuser = async (id) => {
  //return value of asyn func is promise
  const user = userSchema.findById(id).exec();
  return user;
};

export const getuserName = async (id) => {
  //return value of asyn func is promise
  const user = await userSchema.findOne({ userName: id }).exec();
  return user;
};

export const getuserDetails = async (body) => {
  //return value of asyn func is promise
  const user = await userSchema.findOne({ userName: body.userName }).exec();
  if (!user) {
    return null;
  }

  const isMatch = await new Promise((resolve, reject) => {
    user.comparePassword(body.userPassword, (error, match) => {
      if (error) {
        reject(error);
      } else {
        resolve(match);
      }
    });
  });

  if (isMatch) {
    console.log("User authenticated successfully.");
    return user;
  } else {
    console.log("Authentication failed. Incorrect password.");
    return null;
  }
};

export const resetPassword = async (body) => {
  const user = await userSchema
    .findOne({
      resetPasswordToken: body.resetPasswordToken /* 
      resetPasswordExpires: { $gt: Date.now() }, */,
    })
    .exec();
  if (!user) {
    return null; // Token not found or expired
  }

  user.userPassword = body.userPassword; // new raw password
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save(); // This will trigger the pre-save hook to hash the password

  console.log("Password has been reset successfully.");

  await sendEmail(
    user.userEmail,
    "Password Reset is done",
    `<div>Dear User, Your password is reset</div>`
  );
  return user;
};

export const removeuser = async (id) => {
  //return value of asyn func is promise
  const user = userSchema.findByIdAndDelete({ UserId: id }).exec();
  return user;
};

export const resetLink = async (body) => {
  //return value of asyn func is promise
  const findUser = await userSchema
    .findOne({ userEmail: body.userEmail })
    .exec();
  if (!findUser) {
    return null;
  }

  if (!(findUser.resetPasswordExpires >= Date.now())) {
    return null;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 3600000;

  findUser.resetPasswordToken = token;
  findUser.resetPasswordExpires = expires;

  await findUser.save();

  const resetLink = `http://yourfrontend.com/reset-password/${token}`;

  const emailnotificationID = await sendEmail(
    findUser.userEmail,
    "Reset Password",
    `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; color: #333;">
    <h2 style="color: #007bff;">Welcome to Our Platform 🎉</h2>
    <p>Dear User,</p>
    <p>You requested to reset your password.</p>
    <p>Please click the link below to proceed:</p>
    <p><a href="${resetLink}" style="color: #ffffff; background-color: #28a745; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">Reset Password</a></p>
    <p style="margin-top: 20px;">If you didn’t request this, you can safely ignore this email.</p>
    <p>Thanks,<br/>The Carpool Team</p>
  </div>
`
  );

  return;
};

//Creating update service which is called from controllers
export const updateDetails = async (id, updateduser) => {
  //return value of asyn func is promise
  //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
  const userNew = { ...updateduser };
  const user = await userSchema
    .findOneAndUpdate({ UserId: id }, userNew, {
      new: true,
      runValidators: true,
    })
    .exec();
  return user;
};

export const searchuser = async (params) => {
  //return value of asyn func is promise
  const users = userSchema.find(params).exec();
  return users;
};
