import driverCreateRidesSchema from "../model/driverCreateRide";

export const saveDriverRide = async (newDriver) => {
  //return value of asyn func is promise
  const driver = new driverCreateRidesSchema(newDriver);
  return driver.save();
};

export const getDriverRide = async (id) => {
  //return value of asyn func is promise
  const driver = driverCreateRidesSchema.findById(id).exec();
  return driver;
};
export const removeDriver = async (id) => {
  //return value of asyn func is promise
  const driver = driverCreateRidesSchema.findByIdAndDelete(id).exec();
  return driver;
};

//Creating update service which is called from controllers
export const updateDetails = async (id, updatedDriver) => {
  //return value of asyn func is promise
  //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
  const driverNew = { ...updatedDriver };
  const driver = driverCreateRidesSchema
    .findByIdAndUpdate(id, driverNew, { new: true })
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
  const drivers = driverCreateRidesSchema.find(params).exec();
  return drivers;
};
