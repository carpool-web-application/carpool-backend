//import * as reminderService from './../services/reminder-service.js';
import {saveRider, getRider, removeRider, updateDetails, searchRider} from '../services/rider-service.js';
//reminderService.save();

//define the method for reminder creation
export const post = async(request, response) =>{
    try{
    const newRider = request.body;
    const savedRider = await saveRider(newRider);
   setSuccessfulResponse(savedRider, response);
    } catch(err){
        setErrorResponse(err,response);
    }
}


export const index= async(request, response) =>{
    try{
        const params = {};
        const riders = await searchRider(params);
        setSuccessfulResponse(riders,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}

//define the method for rider searching
export const find= async(request, response) =>{
    try{
        const id = request.params.RiderUserName;
        const rider = await getRider(id);
        setSuccessfulResponse(rider,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}

//define the method for reminder deletion
export const deleteRider  = async(request, response) => {
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
        const id = request.params.RiderUserName;
        const body =  request.body;
        const rider = await updateDetails(id,body);
        
        setSuccessfulResponse(rider,response);
    
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