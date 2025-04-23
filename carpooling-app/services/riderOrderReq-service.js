import mongoose from "mongoose";
import RiderOrderReq from "../model/RiderRequest.js";
export const saveRiderOrderReq = async (newRiderOrderReq) => {
  //return value of asyn func is promise
  console.log(newRiderOrderReq);
  //check if user is requesting for the same driver
  const findRequestedRide = await RiderOrderReq.find({
    rider: newRiderOrderReq.rider,
    driver: newRiderOrderReq.driver,
    CommuteStatus: "pending",
  }).exec();
  console.log(findRequestedRide);
  if (findRequestedRide.length === 0) {
    const riderOrderReq = new RiderOrderReq({
      ...newRiderOrderReq,
      rider: new mongoose.Types.ObjectId(newRiderOrderReq.rider),
      driver: new mongoose.Types.ObjectId(newRiderOrderReq.driver),
      ride: new mongoose.Types.ObjectId(newRiderOrderReq.ride),
    });
    return riderOrderReq.save();
  }

  return null;
};

export const getRiderReq = async (rider) => {
  //return value of asyn func is promise
  const riderOrderReq = await RiderOrderReq.findOne({
    rider: rider,
  }).exec();
  return riderOrderReq;
};

export const getPendingRide = async (rider) => {
  //return value of asyn func is promise
  const riderOrderReq = await RiderOrderReq.find({
    driver: rider,
    CommuteStatus: "pending",
  })
    .populate("driver", "-userPassword -driverDetails")
    .populate("rider", "-userPassword -driverDetails")
    .exec();
  return riderOrderReq;
};

export const getRides = async (queryParams) => {
  //return value of asyn func is promise
  const query = {};
  if (queryParams.driver) {
    query.driver = queryParams.driver;
  }
  if (queryParams.CommuteStatus) {
    query.CommuteStatus = queryParams.CommuteStatus;
  }
  const riderOrderReq = await RiderOrderReq.find(query)
    .populate("driver", "-userPassword -driverDetails")
    .populate("rider", "-userPassword -driverDetails")
    .exec();
  return riderOrderReq;
};

export const getDriverOrderNumberReq = async (id) => {
  //return value of asyn func is promise
  const riderOrderReq = await RiderOrderReq.find({
    DriverOrderNumber: id,
  }).exec();
  return riderOrderReq;
};

export const getRiderOrderDetails = async (rider) => {
  //return value of asyn func is promise
  const riderOrderReq = await RiderOrderReq.find({
    RiderId: rider,
  }).exec();

  return riderOrderReq;
};

export const removeRiderOrderReq = async (id) => {
  //return value of asyn func is promise
  const riderOrderReq = await RiderOrderReq.findByIdAndDelete(id).exec();
  return riderOrderReq;
};

//Creating update service which is called from controllers
export const updateDetails = async (id, updatedriderOrderReq) => {
  //return value of asyn func is promise
  //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
  const riderOrderReqNew = { ...updatedriderOrderReq };
  const riderOrderReq = await RiderOrderReq.findOneAndUpdate(
    { RiderId: id },
    { $set: riderOrderReqNew },
    { new: true }
  ).exec();
  //const riderOrderReq =  RiderOrderReq.findOneAndUpdate({ RiderId: id } ,{ $push: { ratings: riderOrderReqNew.ratings } },riderOrderReqNew,{new: true}).exec();
  return riderOrderReq;
};

//Creating update service which is called from controllers
export const requestDecision = async (id, requestPayload) => {
  //return value of asyn func is promise
  //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
  const riderOrderReq = await RiderOrderReq.findOneAndUpdate(
    { RequestId: id },
    { CommuteStatus: requestPayload.commuterStatus }
  ).exec();
  //const riderOrderReq =  RiderOrderReq.findOneAndUpdate({ RiderId: id } ,{ $push: { ratings: riderOrderReqNew.ratings } },riderOrderReqNew,{new: true}).exec();
  return riderOrderReq;
};

export const searchRiderOrderReq = async (params) => {
  //return value of asyn func is promise
  const riderOrderReqs = await RiderOrderReq.find(params).exec();
  return riderOrderReqs;
};
