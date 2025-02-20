import { catchAsyncFunction } from "./catchAsyncFunction.js";
import AppError from "./AppError.js";
import userSchema from "../model/user.js";
import dotenv from "dotenv";

import jwt from "jsonwebtoken";
dotenv.config();

export const generateJWT = (req, res, next) => {
  const user = req.body;
  if (!user) {
    return res
      .status(400)
      .send({ error: "User data is required for token generation" });
  }
  //creating the payload to be signed
  const userPayload = {
    id: user._id,
    userId: user.UserId,
    userName: user.userName,
    userEmail: user.userEmail,
    commuterType: user.commuterType,
  };
  const secret = process.env.secret;

  const options = {
    expiresIn: process.env.expirationOption,
  };

  const token = jwt.sign(userPayload, secret, options);

  res.locals.token = token; // Store token in res.locals for use in the next middleware
  res.status(200).json({
    id: user._id,
    userId: user.UserId,
    commuterType: user.commuterType,
    userEmail: user.userEmail,
    token,
    message: "Login successful and token generated.",
  });
};

export const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    return next(new AppError("Access Denied: No token provided", 401)); //res.status(401).send("Access Denied: No token provided");
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return next(new AppError("Access Denied: Invalid Token", 401)); //res.status(401).send("Invalid Token");
    }

    req.token = decoded; // Store user information from JWT in the request object
    next(); // Continue to the next middleware or route handler
  });
};

export const validateUser = (roleAccess) => {
  return catchAsyncFunction(async (req, res, next) => {
    const userDetails = req.token;
    const user = await userSchema
      .findOne({ UserId: userDetails.userId })
      .exec();
    if (!user) {
      return next(new AppError("User Does not exist", 404));
    }
    if (!roleAccess.includes(user.commuterType)) {
      return next(
        new AppError(
          "Unauthorized: The user does not have neccessary role to access the endpoint",
          401
        )
      );
    }
    next();
  });
};
