import express from "express";
import * as riderController from '../controller/riderOrderReq-controller.js';

const router = express.Router();

//route the methods with controller logic
router.route('/')
   .post(riderController.post)
   .get(riderController.index);
 
//route the paramterized methods with controller logic 
router.route('/:RiderId')
   .get(riderController.find)
   .delete(riderController.deleteRiderOrder)
   .patch(riderController.updateRiderOrder)
   .put(riderController.updateRiderOrder);

router.route('/Rider/:DriverOrderNumber')
   .get(riderController.findbyOrderNumber)

  export default router;

