//import * as reminderService from './../services/reminder-service.js';
import { savePayment, getPayment } from "../services/payment-service.js";
//reminderService.save();

//define the method for reminder creation
export const post = async (request, response) => {
  try {
    const newPayment = request.body;
    const savedPayment = await savePayment(newPayment);
    setSuccessfulResponse(savedPayment, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

/*export const index= async(request, response) =>{
    try{
        const params = {};
        const riders = await searchRider(params);
        setSuccessfulResponse(riders,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}*/

//define the method for rider searching
export const find = async (request, response) => {
  try {
    const id = request.params.id;
    const payment = await getPayment(id);
    setSuccessfulResponse(payment, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//define the method for reminder deletion
/*export const deleteRider  = async(request, response) => {
try{
    const id = request.params.id;
    const rider = await removeRider(id);
    setSuccessfulResponse(rider,response);

}catch(err){
    setErrorResponse(err,response);
}
}

//define the method for reminder updation
export const updateRider  = async(request, response) => {
    try{
        const id = request.params.id;
        const body =  request.body;
        const rider = await updateDetails(id,body);
        
        setSuccessfulResponse(rider,response);
    
    }catch(err){
        setErrorResponse(err,response);
    }
    }*/

//define when the request is successful
const setSuccessfulResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

//define the error response
const setErrorResponse = (err, response) => {
  response.status(500);
  response.status(404);
  response.json({
    error: {
      message: err,
    },
  });
};
