//import * as reminderService from './../services/reminder-service.js';
import {saveUserAuth, getUserAuth, removeUserAuth, updateDetails, searchUserAuth} from '../services/userAuth-service.js';
//reminderService.save();

//define the method for reminder creation
export const post = async(request, response) =>{
    try{
    const newUserAuth = request.body;
    const savedUserAuth = await saveUserAuth(newUserAuth);
   setSuccessfulResponse(savedUserAuth, response);
    } catch(err){
        setErrorResponse(err,response);
    }
}


export const index= async(request, response) =>{
    try{
        const params = {};
        const userAuths = await searchUserAuth(params);
        setSuccessfulResponse(userAuths,response);
    } catch (err) {
        setErrorResponse(err,response);
//jj
    }

}

//define the method for rider searching
export const find= async(request, response) =>{
    try{
        const id = request.params.id;
        const userAuth = await getUserAuth(id);
        setSuccessfulResponse(userAuth,response);
    } catch (err) {
        setErrorResponse(err,response);

    }

}

//define the method for reminder deletion
export const deleteUserAuth  = async(request, response) => {
try{
    const id = request.params.id;
    const userAuth = await removeUserAuth(id);
    setSuccessfulResponse(userAuth,response);

}catch(err){
    setErrorResponse(err,response);
}
}

//define the method for reminder updation
export const updateuserAuth  = async(request, response) => {
    try{
        const id = request.params.id;
        const body =  request.body;
        const userAuth = await updateDetails(id,body);
        
        setSuccessfulResponse(userAuth,response);
    
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