import DriverOrder from "../model/driverOrder.js";

export const saveDriverOrder = async (newDriverOrder) => {
  //return value of asyn func is promise
  const driverOrder = new DriverOrder({
    newDriverOrder,
  }).save();

  //logic to add themselves to the order of the driver
  const updateDriverOrder = await DriverOrder.find({
    ride: driverOrder.ride,
    status: { $eq: "ongoing" },
  }).exec();
  const updateOrder = await updateDriverOrder.driverOrders.push(
    driverOrder._id
  );
  await updateOrder.save();
  return driverOrder;
};

export const getDriverOrder = async (id) => {
  //return value of asyn func is promise
  const driverOrder = await DriverOrder.findOne({ driver: id })
    .populate("driver", "UserId userName userName PhoneNumber averageRating")
    .exec();
  return driverOrder;
};

export const getDriverOrderNumberReq = async (id) => {
  //return value of asyn func is promise
  const driverOrderReq = DriverOrder.find({ DriverOrderNumber: id }).exec();
  return driverOrderReq;
};

export const removeDriverOrder = async (id) => {
  //return value of asyn func is promise
  const driverOrder = DriverOrder.findOneAndDelete(id).exec();
  return driverOrder;
};

//Creating update service which is called from controllers
export const updateDetails = async (id, updateddriverOrder) => {
  //return value of asyn func is promise
  //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
  const driverOrderNew = { ...updateddriverOrder };
  const driverOrder = DriverOrder.findOneAndUpdate(id, driverOrderNew, {
    new: true,
  }).exec();
  return driverOrder;
};

/* 
export const updateDriverOrder = async (id, updatedCommuter) => {
    const driverOrderwithdate  = {...updateDriverOrder, lastUpdatedDate: Date.now()}
    const driverOrder = DriverOrder.findByIdAndUpdate(id, driverOrderwithdate, {new: true}).exec();
    return driverOrder;      
} */

export const searchDriverOrder = async (params) => {
  //return value of asyn func is promise
  const driverOrders = DriverOrder.find(params).exec();
  return driverOrders;
};
