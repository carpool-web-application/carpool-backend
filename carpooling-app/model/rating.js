import mongoose from "mongoose";
import { type } from "os";
import { v4 as uuidv4 } from "uuid";

const rating = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: [true, "Order Information is required"],
    unqiue: true,
  },
  ratedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User Information is required"],
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Reviewer Information is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: { type: String },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const ratingSchema = mongoose.model("ratings", rating);

export default ratingSchema;
