import userSchema from "../model/user.js";

export const saveUser = async (newuser) => {
  //return value of asyn func is promise
  const user = new userSchema(newuser);
  return user.save();
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
  const user = userSchema.findByIdAndUpdate(id, userNew, { new: true }).exec();
  return user;
};

export const searchuser = async (params) => {
  //return value of asyn func is promise
  const users = userSchema.find(params).exec();
  return users;
};
