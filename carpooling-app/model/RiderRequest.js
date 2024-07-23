import mongoose from "mongoose";

const riderOrderReqSchema = new mongoose.Schema({
    riderOrderNumber: {
        type: String,
        default: null//required: 'The title field is required.'
    },
    DriverOrderNumber:{
        type: Number,
        default: null//required: 'Number of Seats is required.'
    },
    RiderId: {
        type: String,
        default: null//  required: 'The Details field is required.'
    },
    DriverId: {
        type: String,
       default: null // required: 'Starting Location is required.'
    },
    StartingLocation: {
        type: String,
       default: null // required: 'Starting Location is required.'
    },
    Destination: {
        type: String,
        default: null//required: 'Destination is required.'
    },
    PickUpTime: {
        type: Date,
        default: Date.now()
    },
    DriverPostStatus:{
        type: String,
       default: null // required: 'Number of Seats is required.'
    },
    CommuteStatus:{
        type: String,
       default: null // required: 'Number of Seats is required.'
    },
    OriginLatitude:{
        type: String,
        default: null//required: 'Number of Seats is required.'
    },
    OriginLongitude:{
        type: String,
       default: null // required: 'Number of Seats is required.'
    },
    DestinationLatitude:{
        type: String,
        default: null//required: 'Number of Seats is required.'
    },
    DestinationLongitude:{
        type: String,
       default: null // required: 'Number of Seats is required.'
    },
    Riderseats:{
        type: String,
       default: null // required: 'Number of Seats is required.'
    },
    Ratings: [{
        type: Number,
        default: null 
    }]
    ,
    PaymentFlag:{
        type: String,
       default: 'N' // required: 'Number of Seats is required.'
    }
    ,
    RatingFlag:{
        type: String,
       default: 'N' // required: 'Number of Seats is required.'
    }
    ,
    Cost:{
        type: Number,
       default: 0 // required: 'Number of Seats is required.'
    }
}, 

);
const riderOrderReq = mongoose.model('RiderOrderReq',riderOrderReqSchema);

export default riderOrderReq;
