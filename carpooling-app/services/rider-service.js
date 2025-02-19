import user from "../model/user.js";

export const saveRider = async (newRider) => {
  //return value of asyn func is promise
  const rider = new user(newRider);
  return rider.save();
};

export const getRider = async (id) => {
  //return value of asyn func is promise
  const rider = user.findOne({ UserId: id }).exec();
  return rider;
};
export const removeRider = async (id) => {
  //return value of asyn func is promise
  const rider = user.findByIdAndDelete(id).exec();
  return rider;
};

//Creating update service which is called from controllers
export const updateDetails = async (id, updatedrider) => {
  //return value of asyn func is promise
  //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
  const riderNew = { ...updatedrider };
  const rider = user
    .findOneAndUpdate({ UserName: id }, { $set: riderNew }, { new: true })
    .exec();
  //const rider =  Rider.findOneAndUpdate({ RiderUserName: id } ,{ $push: { ratings: riderNew.ratings } },riderNew,{new: true}).exec();
  return rider;
};

/* 
export const updateRider = async (id, updatedCommuter) => {
    const riderwithdate  = {...updateRider, lastUpdatedDate: Date.now()}
    const rider = Rider.findByIdAndUpdate(id, riderwithdate, {new: true}).exec();
    return rider;      
} */

export const searchRider = async (params) => {
  //return value of asyn func is promise
  const riders = user.find(params).exec();
  return riders;
};
