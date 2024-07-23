
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
  const user = userSchema.findOne({userName:id}).exec();
  return user;
};


export const removeuser = async (id) => {
  //return value of asyn func is promise
  const user = userSchema.findByIdAndDelete(id).exec();
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

/* 
export const updateuser = async (id, updatedCommuter) => {
  const userwithdate  = {...updateuser, lastUpdatedDate: Date.now()}
  const user = user.findByIdAndUpdate(id, userwithdate, {new: true}).exec();
  return user;      
} */

export const searchuser = async (params) => {
  //return value of asyn func is promise
  const users = userSchema.find(params).exec();
  return users;
};

