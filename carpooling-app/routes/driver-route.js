import express from "express";
import * as driverController from "../controller/driver-controller.js";
import * as authenticateUser from "../utils/authenticationUtils.js";
import roleAccess from "../utils/SystemConstant.js";
const router = express.Router();

//route the methods with controller logic
router
  .route("/")
  //.post(driverController.post) not required as merged the driver into users
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    driverController.index
  );

//route the paramterized methods with controller logic
router
  .route("/:driverId")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.driverAccess),
    driverController.find
  )
  .delete(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.driverAccess),
    authenticateUser.authorizeSelfOrAdmin("driverId"),
    driverController.deleteDriver
  )
  .patch(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.driverAccess),
    authenticateUser.authorizeSelfOrAdmin("driverId"),
    driverController.updatedriver
  )
  .put(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.driverAccess),
    authenticateUser.authorizeSelfOrAdmin("driverId"),
    driverController.updatedriver
  );

export default router;
