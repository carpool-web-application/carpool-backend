import express from "express";
import rideController from "../controller/ride-controller.js";
import * as authenticateUser from "../utils/authenticationUtils.js";
import roleAccess from "../utils/SystemConstant.js";
const router = express.Router();

router
  .route("/")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    rideController.fetchAllRide
  )
  .post(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.driverAccess),
    rideController.createRide
  );

router
  .route("/:rideId")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.driverAccess),
    rideController.fetchRide
  )
  .put(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.driverAccess),
    rideController.updateRide
  );

/* router
  .route("/:rideId/onGoingRide")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    rideController.onGoingRide
  ); */

/* router
  .route("/:rideId/fetchRides")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    rideController.fetchDriverRide
  ); */

export default router;
