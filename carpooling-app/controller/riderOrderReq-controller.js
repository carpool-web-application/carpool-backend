//import * as reminderService from './../services/reminder-service.js';
import {saveRiderOrderReq, getRiderOrderReq, removeRiderOrderReq, updateDetails, searchRiderOrderReq ,getDriverOrderNumberReq} from '../services/riderOrderReq-service.js';
//reminderService.save();
import { io } from '../../server.js';

//define the method for reminder creation
export const post = async(request, response) =>{
    try{
    const newRiderOrder = request.body;
    const savedRiderOrder = await saveRiderOrderReq(newRiderOrder);
    io.emit('approval_notification', {
        orderNumber: savedRiderOrder.DriverOrderNumber,
        riderId: savedRiderOrder.RiderId,
        message: 'New rider Request approve or reject',
      });
    setSuccessfulResponse(savedRiderOrder, response);
    } catch(err){
        setErrorResponse(err,response);
    }
}


export const index= async(request, response) =>{
    try{
        const params = {};
        const riderOrders = await searchRiderOrderReq(params);
        setSuccessfulResponse(riderOrders,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}

//define the method for riderOrder searching
export const find= async(request, response) =>{
    try{
        const id = request.params.RiderId;
        const riderOrder = await getRiderOrderReq(id);
        setSuccessfulResponse(riderOrder,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}



export const findbyOrderNumber= async(request, response) =>{
    try{
        const id = request.params.DriverOrderNumber;
        const riderOrder = await getDriverOrderNumberReq(id);
        response.status(200).json(riderOrder);
    } catch (err) {
        setErrorResponse(err,response);

    }

}

//define the method for reminder deletion
export const deleteRiderOrder  = async(request, response) => {
try{
    const id = request.params.id;
    const riderOrder = await removeRiderOrderReq(id);
    setSuccessfulResponse(riderOrder,response);

}catch(err){
    setErrorResponse(err,response);
}
}

//define the method for reminder updation
export const updateRiderOrder  = async(request, response) => {
    try{
        const id = request.params.RiderId;
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