import paymentSchemaUpdated from "../model/payment.js";

export const savePayment = async (newPayment) => {
  //return value of asyn func is promise
  const payment = new paymentSchemaUpdated(newPayment);
  return payment.save();
};

export const getPayment = async (id) => {
  //return value of asyn func is promise
  const payment = paymentSchemaUpdated.findById(id).exec();
  return payment;
};
/*
export const removeRider = async (id) =>{
    //return value of asyn func is promise
   const rider =  Rider.findByIdAndDelete(id).exec();
   return rider;
}

//Creating update service which is called from controllers
export const updateDetails = async (id, updatedrider) =>{
    //return value of asyn func is promise
    //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
    const riderNew = {...updatedrider};
   const rider =  Rider.findByIdAndUpdate(id,riderNew,{new: true}).exec();
   return rider;
}

/* 
export const updateRider = async (id, updatedCommuter) => {
    const riderwithdate  = {...updateRider, lastUpdatedDate: Date.now()}
    const rider = Rider.findByIdAndUpdate(id, riderwithdate, {new: true}).exec();
    return rider;      
} */
