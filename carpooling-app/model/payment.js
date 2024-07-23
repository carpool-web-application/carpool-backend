import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: Number,
  },
  cost: {
    type: Number,
    
  },
  riderId: {
    type: Number,
  },
  driverId: {
    type: Number,
  },
  
});

const paymentSchemaUpdated = new mongoose.model("PaymentSchema", paymentSchema);
export default paymentSchemaUpdated;
