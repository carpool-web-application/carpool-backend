import express from "express";
import driverRouter from "./driver-route.js";
import riderRouter from "./rider-route.js";
import riderOrderRouter from "./riderOrder-route.js";
import user from "./user-route.js";
import riderReq from "./riderReq-route.js";
import payment from "./payment-route.js";
import { globalErrorHandler } from "../controller/globalErrorHandler.js";
import AppError from "../utils/AppError.js";

const route = (app) => {
  //creating the router
  const router = express.Router();
  //defining the routes using the router
  router.use("/", (request, response, next) => {
    next();
  });
  router.use("/drivers", driverRouter);
  router.use("/riders", riderRouter);
  router.use("/riderOrders", riderOrderRouter);
  router.use("/user", user);
  router.use("/riderRequest", riderReq);
  router.use("/payment", payment);

  //attaching thepath to the router
  app.use("/carpool/v1", router);

  //if no path matches then handle validation error
  app.use("*", (request, response, next) => {
    next(new AppError(`The wrong ${request.url}`, 404));
  });

  app.use(globalErrorHandler);
};

export default route;
