import UserAuth from '../model/UserAuth.js';

export const saveUserAuth = async (newUserAuth) =>{
    //return value of asyn func is promise
   const userAuth = new UserAuth(newUserAuth);
   return userAuth.save();
}

export const getUserAuth = async (id) =>{
    //return value of asyn func is promise
   const userAuth =  UserAuth.findById(id).exec();
   return userAuth;
}
export const removeUserAuth = async (id) =>{
    //return value of asyn func is promise
   const userAuth =  UserAuth.findByIdAndDelete(id).exec();
   return userAuth;
}

//Creating update service which is called from controllers
export const updateDetails = async (id, updateduserAuth) =>{
    //return value of asyn func is promise
    //const reminderwithdate  = {...updatedReminder, lastModifiedDate: Date.now()}
    const userAuthNew = {...updateduserAuth};
   const userAuth =  UserAuth.findByIdAndUpdate(id,userAuthNew,{new: true}).exec();
   return userAuth;
}

/* 
export const updateUserAuth = async (id, updatedCommuter) => {
    const userAuthwithdate  = {...updateUserAuth, lastUpdatedDate: Date.now()}
    const userAuth = UserAuth.findByIdAndUpdate(id, userAuthwithdate, {new: true}).exec();
    return userAuth;      
} */

export const searchUserAuth = async (params) =>{
    //return value of asyn func is promise
   const userAuths =  UserAuth.find(params).exec();
   return userAuths;
}

