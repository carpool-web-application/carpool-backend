import express from "express";
import * as riderController from "../controller/rider-controller.js";
import * as authenticateUser from "../utils/authenticationUtils.js";
import roleAccess from "../utils/SystemConstant.js";
const router = express.Router();

//route the methods with controller logic
router
  .route("/")
  //.post(riderController.post) //removed due to not required
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.adminAccess),
    riderController.index
  ); //fetch all rider/commuter

//route the paramterized methods with controller logic
router
  .route("/:RiderUserName")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.riderAccess),
    riderController.find
  )
  .delete(riderController.deleteRider)
  .patch(riderController.updateRider)
  .put(riderController.updateRider);

export default router;
