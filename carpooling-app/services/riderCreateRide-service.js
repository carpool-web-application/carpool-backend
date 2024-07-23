import riderRideSchema from "../model/riderCreateRide";

export const saveRiderRide = async (newRide) => {
  //return value of asyn func is promise
  const ride = new riderRideSchema(newDriver);
  return ride.save();
};

export const getRiderRide = async (id) => {
  //return value of asyn func is promise
  const ride = riderRideSchema.findById(id).exec();
  return ride;
};
export const removeRiderRide = async (id) => {
  //return value of asyn func is promise
  const ride = riderRideSchema.findByIdAndDelete(id).exec();
  return ride;
};

//Creating update service which is called from controllers
export const updateDetails = async (id, updatedRiderRide) => {
  //return value of asyn func is promise
  //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
  const rideNew = { ...updatedRiderRide };
  const ride = riderRideSchema
    .findByIdAndUpdate(id, rideNew, { new: true })
    .exec();
  return ride;
};

/* 
export const updateDriver = async (id, updatedCommuter) => {
  const driverwithdate  = {...updateDriver, lastUpdatedDate: Date.now()}
  const driver = Driver.findByIdAndUpdate(id, driverwithdate, {new: true}).exec();
  return driver;      
} */

export const searchRide = async (params) => {
  //return value of asyn func is promise
  const ride = riderRideSchema.find(params).exec();
  return ride;
};
