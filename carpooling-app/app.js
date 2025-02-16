// Importing modules
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

import route from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use bodyParser middleware for parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Security middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Whitelist option for HPP
/* app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
); */

// Add request timestamp middleware
app.use((req, res, next) => {
  const requestedTime = new Date().toISOString();
  req.requestedTime = requestedTime;

  console.log(`api call at ${requestedTime}`);
  next();
});

// Routes
route(app);

// Export the app instance
export default app;
