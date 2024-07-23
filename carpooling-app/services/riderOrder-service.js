import RiderOrder from '../model/riderOrder.js';

export const saveRiderOrder = async (newRiderOrder) =>{
    //return value of asyn func is promise
   const riderOrder = new RiderOrder(newRiderOrder);
   return riderOrder.save();
}

export const getRiderOrder = async (id) =>{
    //return value of asyn func is promise
   const riderOrder =  RiderOrder.findOne({DriverId:id}).exec();
   return riderOrder;
}


export const getDriverOrderNumberReq = async (id) =>{
    //return value of asyn func is promise
   const riderOrderReq =  RiderOrder.find({DriverOrderNumber:id}).exec();
   return riderOrderReq;
}


export const removeRiderOrder = async (id) =>{
    //return value of asyn func is promise
   const riderOrder =  RiderOrder.findOneAndDelete(id).exec();
   return riderOrder;
}

//Creating update service which is called from controllers
export const updateDetails = async (id, updatedriderOrder) =>{
    //return value of asyn func is promise
    //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
    const riderOrderNew = {...updatedriderOrder};
   const riderOrder =  RiderOrder.findOneAndUpdate({DriverId:id},riderOrderNew,{new: true}).exec();
   return riderOrder;
}

/* 
export const updateRiderOrder = async (id, updatedCommuter) => {
    const riderOrderwithdate  = {...updateRiderOrder, lastUpdatedDate: Date.now()}
    const riderOrder = RiderOrder.findByIdAndUpdate(id, riderOrderwithdate, {new: true}).exec();
    return riderOrder;      
} */

export const searchRiderOrder = async (params) =>{
    //return value of asyn func is promise
   const riderOrders =  RiderOrder.find(params).exec();
   return riderOrders;
}

