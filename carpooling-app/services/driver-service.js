import user from "../model/user.js";

export const saveDriver = async (newDriver) => {
  //return value of asyn func is promise
  const driver = new user(newDriver);
  return driver.save();
};

export const getDriver = async (id) => {
  //return value of asyn func is promise
  const driver = user.findOne({ UserId: id }).exec();
  return driver;
};
export const removeDriver = async (id) => {
  //return value of asyn func is promise
  const driver = user.findOneAndDelete({ UserId: id }).exec();
  return driver;
};

//Creating update service which is called from controllers
export const updateDetails = async (id, updatedDriver) => {
  //return value of asyn func is promise
  //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
  const driverNew = { ...updatedDriver };
  const driver = user
    .findOneAndUpdate({ userName: id }, { $set: driverNew }, { new: true })
    .exec();
  return driver;
};

/* 
export const updateDriver = async (id, updatedCommuter) => {
    const driverwithdate  = {...updateDriver, lastUpdatedDate: Date.now()}
    const driver = Driver.findByIdAndUpdate(id, driverwithdate, {new: true}).exec();
    return driver;      
} */

export const searchDriver = async (params) => {
  //return value of asyn func is promise
  const drivers = user.find(params).exec();
  return drivers || {};
};
