import express from "express";
import * as riderController from "../controller/riderOrderReq-controller.js";
import { verifyJWT } from "../utils/authenticationUtils.js";

const router = express.Router();

//route the methods with controller logic
router.route("/").post(riderController.post);

//route the paramterized methods with controller logic
router
  .route("/:RiderId")
  .get(verifyJWT, riderController.find)
  .delete(verifyJWT, riderController.deleteRiderOrder)
  .patch(verifyJWT, riderController.updateRiderOrder)
  .put(verifyJWT, riderController.updateRiderOrder);

router
  .route("/Rider/:DriverOrderNumber")
  .get(riderController.findbyOrderNumber);

router
  .route("/:RiderId/getPastRides")
  .get(verifyJWT, riderController.getPastRides);

export default router;
