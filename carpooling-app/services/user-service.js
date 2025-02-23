import userSchema from "../model/user.js";
import AppError from "../utils/AppError.js";

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

export const removeuser = async (id) => {
  //return value of asyn func is promise
  const user = userSchema.findByIdAndDelete({ UserId: id }).exec();
  return user;
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
