import express from "express";
import * as userAuthController from '../controller/user-controller.js';

const router = express.Router();

//route the methods with controller logic
router.route('/')
   .post(userAuthController.post)
   .get(userAuthController.index);
 
//route the paramterized methods with controller logic 
router.route('/:userName')
   .get(userAuthController.findbyUserName)
   .delete(userAuthController.deleteUser)
   .patch(userAuthController.updatuser)
   .put(userAuthController.updatuser);
/* 
   router.route('/:userName')
   .get(userAuthController.findbyUserName); */

   

  export default router;

