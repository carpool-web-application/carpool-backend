import express from "express";
import * as userAuthController from '../controller/userAuth-controller.js';

const router = express.Router();

//route the methods with controller logic
router.route('/')
   .post(userAuthController.post)
   .get(userAuthController.index);
 
//route the paramterized methods with controller logic 
router.route('/:id')
   .get(userAuthController.find)
   .delete(userAuthController.deleteUserAuth)
   .patch(userAuthController.updateuserAuth)
   .put(userAuthController.updateuserAuth);


  export default router;

