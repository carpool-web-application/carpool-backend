//import * as reminderService from './../services/reminder-service.js';
import {saveDriver, getDriver, removeDriver, updateDetails, searchDriver} from '../services/driver-service.js';
//reminderService.save();

//define the method for reminder creation
export const post = async(request, response) =>{
    try{
    const newDriver = request.body;
    const savedDriver = await saveDriver(newDriver);
   setSuccessfulResponse(savedDriver, response);
    } catch(err){
        setErrorResponse(err,response);
    }
}


export const index= async(request, response) =>{
    try{
        const params = {};
        const drivers = await searchDriver(params);
        setSuccessfulResponse(drivers,response);
    } catch (err) {
        setErrorResponse(err,response);
//jj
    }

}

//define the method for rider searching
export const find= async(request, response) =>{
    try{
        const id = request.params.DriverUserName;
        const driver = await getDriver(id);
        setSuccessfulResponse(driver,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}

//define the method for reminder deletion
export const deleteDriver  = async(request, response) => {
try{
    const id = request.params.DriverUserName;
    const driver = await removeDriver(id);
    setSuccessfulResponse(driver,response);

}catch(err){
    setErrorResponse(err,response);
}
}

//define the method for reminder updation
export const updatedriver  = async(request, response) => {
    try{
        const id = request.params.DriverUserName;
        const body =  request.body;
        const driver = await updateDetails(id,body);
        
        setSuccessfulResponse(driver,response);
    
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