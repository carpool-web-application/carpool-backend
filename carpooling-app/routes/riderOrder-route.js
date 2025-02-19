import express from "express";
import * as riderOrderController from "../controller/riderOrder-controller.js";
import * as authenticateUser from "../utils/authenticationUtils.js";
import roleAccess from "../utils/SystemConstant.js";
const router = express.Router();

//route the methods with controller logic
router
  .route("/")
  .post(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderOrderController.post
  )
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderOrderController.index
  );

//route the paramterized methods with controller logic
router
  .route("/:RideId")
  .get(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderOrderController.find
  )
  .delete(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderOrderController.deleteRiderOrder
  )
  .patch(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderOrderController.updateRiderOrder
  )
  .put(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    riderOrderController.updateRiderOrder
  );

export default router;
