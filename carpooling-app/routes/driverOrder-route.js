import express from "express";
import * as driverOrderController from "../controller/driverOrder-controller.js";
import * as authenticateUser from "../utils/authenticationUtils.js";
import roleAccess from "../utils/SystemConstant.js";
const router = express.Router();

router
  .route("/")
  .post(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    driverOrderController.post
  );

router
  .route("/:UserId/driver")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    driverOrderController.find
  );

router
  .route("/:orderId")
  .delete(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    driverOrderController.deleteDriverOrder
  )
  .patch(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    driverOrderController.updateDriverOrder
  );

export default router;
