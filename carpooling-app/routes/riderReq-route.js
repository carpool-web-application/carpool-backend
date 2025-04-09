import express from "express";
import * as riderController from "../controller/riderOrderReq-controller.js";
import * as authenticateUser from "../utils/authenticationUtils.js";
import roleAccess from "../utils/SystemConstant.js";
const router = express.Router();

//route the methods with controller logic
router
  .route("/")
  .post(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderController.post
  )
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderController.fetchRides
  );

//route the paramterized methods with controller logic
router
  .route("/:UserId")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderController.find
  )
  .delete(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderController.deleteRiderOrder
  );

router
  .route("/request/:RequestId")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderController.findPendingRide
  )
  .patch(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderController.updateRideRequest
  );

export default router;
