import express from "express";
import * as riderController from '../controller/rider-controller.js';

const router = express.Router();

//route the methods with controller logic
router.route('/')
   .post(riderController.post)
   .get(riderController.index);
 
//route the paramterized methods with controller logic 
router.route('/:RiderUserName')
   .get(riderController.find)
   .delete(riderController.deleteRider)
   .patch(riderController.updateRider)
   .put(riderController.updateRider);


  export default router;

