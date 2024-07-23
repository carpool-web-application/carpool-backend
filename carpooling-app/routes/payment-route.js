import express from "express";
import * as paymentController from '../controller/payment-controller.js';

const router = express.Router();

//route the methods with controller logic
router.route('/')
   .post(paymentController.post)
   .get(paymentController.find);
 
//route the paramterized methods with controller logic 
router.route('/:id')
   .get(paymentController.find)
  


  export default router;

