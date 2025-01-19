import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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
    userId: user.UserId,
    commuterType: user.commuterType,
    token,
    message: "Login successful and token generated.",
  });
};

export const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).send("Access Denied: No token provided");
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid Token");
    }

    req.token = decoded; // Store user information from JWT in the request object
    next(); // Continue to the next middleware or route handler
  });
};
