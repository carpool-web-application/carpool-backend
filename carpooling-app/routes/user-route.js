import express from "express";
import * as userAuthController from "../controller/user-controller.js";
import { generateJWT } from "../utils/authenticationUtils.js";

const router = express.Router();

//route the methods with controller logic
router.route("/signup").post(userAuthController.post);

router.route("/login").post(userAuthController.login, generateJWT);

//route the paramterized methods with controller logic
router
  .route("/:riderId")
  .get(userAuthController.findbyUserName)
  .delete(userAuthController.deleteUser)
  .patch(userAuthController.updatuser)
  .put(userAuthController.updatuser);

export default router;
