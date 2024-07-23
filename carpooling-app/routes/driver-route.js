import express from "express";
import * as driverController from '../controller/driver-controller.js';

const router = express.Router();

//route the methods with controller logic
router.route('/')
   .post(driverController.post)
   .get(driverController.index);
 
//route the paramterized methods with controller logic 
router.route('/:DriverUserName')
   .get(driverController.find)
   .delete(driverController.deleteDriver)
   .patch(driverController.updatedriver)
   .put(driverController.updatedriver);


  export default router;

