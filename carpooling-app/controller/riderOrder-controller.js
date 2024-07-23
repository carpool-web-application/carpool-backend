//import * as reminderService from './../services/reminder-service.js';
import {saveRiderOrder, getRiderOrder, removeRiderOrder, updateDetails, searchRiderOrder ,getDriverOrderNumberReq} from '../services/riderOrder-service.js';
//reminderService.save();

//define the method for reminder creation
export const post = async(request, response) =>{
    try{
    const newRiderOrder = request.body;
    const savedRiderOrder = await saveRiderOrder(newRiderOrder);
   setSuccessfulResponse(savedRiderOrder, response);
    } catch(err){
        setErrorResponse(err,response);
    }
}


export const index= async(request, response) =>{
    try{
        const params = {};
        const riderOrders = await searchRiderOrder(params);
        setSuccessfulResponse(riderOrders,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}

//define the method for riderOrder searching
export const find= async(request, response) =>{
    try{
        const id = request.params.DriverId;
        const riderOrder = await getRiderOrder(id);
        setSuccessfulResponse(riderOrder,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}

export const findbyOrderNumber= async(request, response) =>{
    try{
        const id = request.params.DriverOrderNumber;
        const riderOrder = await getDriverOrderNumberReq(id);
        setSuccessfulResponse(riderOrder,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}

//define the method for reminder deletion
export const deleteRiderOrder  = async(request, response) => {
try{
    const id = request.params.DriverId;
    const riderOrder = await removeRiderOrder(id);
    setSuccessfulResponse(riderOrder,response);

}catch(err){
    setErrorResponse(err,response);
}
}

//define the method for reminder updation
export const updateRiderOrder  = async(request, response) => {
    try{
        const id = request.params.DriverId;
        const body =  request.body;
        const riderOrder = await updateDetails(id,body);
        
        setSuccessfulResponse(riderOrder,response);
    
    }catch(err){
        setErrorResponse(err,response);
    }
    }

//define when the request is successful
const setSuccessfulResponse = (obj, response) =>{
    response.status(200);
    response.json(obj);
}

//define the error response
const setErrorResponse = (err,response) =>{
    response.status(500);
    response.status(404);
    response.json({
        error: {
            message:err
        }
    });
}