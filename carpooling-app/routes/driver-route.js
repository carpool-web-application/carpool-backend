import express from "express";
import * as driverController from "../controller/driver-controller.js";
import * as authenticateUser from "../utils/authenticationUtils.js";
import roleAccess from "../utils/SystemConstant.js";
const router = express.Router();

//route the methods with controller logic
router
  .route("/")
  //.post(driverController.post) not required as merged the driver into users
  .get(driverController.index); //include rbac into the application

//route the paramterized methods with controller logic
router
  .route("/:driverId")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.driverAccess),
    driverController.find
  )
  .delete(driverController.deleteDriver)
  .patch(driverController.updatedriver)
  .put(driverController.updatedriver);

export default router;
