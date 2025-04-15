import express from "express";
import * as userAuthController from "../controller/user-controller.js";
import * as authenticateUser from "../utils/authenticationUtils.js";
import roleAccess from "../utils/SystemConstant.js";
const router = express.Router();

//route the methods with controller logic
router.route("/signup").post(userAuthController.post);

router.route("/forgotPassword").post(userAuthController.passwordResetLink);
router.route("/resetPassword").post(userAuthController.passwordReset);

router
  .route("/login")
  .post(userAuthController.login, authenticateUser.generateJWT);

//route the paramterized methods with controller logic
router
  .route("/:userId")
  .get(userAuthController.findbyUserName)
  .delete(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    userAuthController.deleteUser
  )
  .patch(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    userAuthController.updatuser
  )
  .put(
    authenticateUser.verifyJWT,
    authenticateUser.validateUser(roleAccess.commonAccess),
    userAuthController.updatuser
  );

export default router;
