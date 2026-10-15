import RiderOrder from "../model/riderOrder.js";
import DriverOrder from "../model/driverOrder.js";

export const saveRiderOrder = async (newRiderOrder) => {
  //return value of asyn func is promise
  const riderOrder = await new RiderOrder(newRiderOrder).save();

  //logic to add themselves to the order of the driver
  await DriverOrder.findOneAndUpdate({
    ride: riderOrder.ride,
    status: { $eq: "ongoing" },
  }, {
    $addToSet: { riderOrders: riderOrder._id },
    $inc: {
      totalFareCollected: riderOrder.fare,
      totalSeatsFilled: riderOrder.seatsBooked,
    },
  }).exec();
  return riderOrder;
};

export const getRiderOrder = async (id) => {
  //return value of asyn func is promise
  const riderOrder = await RiderOrder.findOne({ rider: id })
    .populate("rider", "UserId userName userName PhoneNumber averageRating")
    .exec();
  return riderOrder;
};

export const getDriverOrderNumberReq = async (id) => {
  //return value of asyn func is promise
  const riderOrderReq = RiderOrder.find({ DriverOrderNumber: id }).exec();
  return riderOrderReq;
};

export const removeRiderOrder = async (id) => {
  //return value of asyn func is promise
  const riderOrder = RiderOrder.findByIdAndDelete(id).exec();
  return riderOrder;
};

//Creating update service which is called from controllers
export const updateDetails = async (id, updatedriderOrder) => {
  //return value of asyn func is promise
  //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
  const riderOrderNew = { ...updatedriderOrder };
  const riderOrder = RiderOrder.findByIdAndUpdate(id, riderOrderNew, {
    new: true,
    runValidators: true,
  }).exec();
  return riderOrder;
};

/* 
export const updateRiderOrder = async (id, updatedCommuter) => {
    const riderOrderwithdate  = {...updateRiderOrder, lastUpdatedDate: Date.now()}
    const riderOrder = RiderOrder.findByIdAndUpdate(id, riderOrderwithdate, {new: true}).exec();
    return riderOrder;      
} */

export const searchRiderOrder = async (params) => {
  //return value of asyn func is promise
  const riderOrders = RiderOrder.find(params).exec();
  return riderOrders;
};
