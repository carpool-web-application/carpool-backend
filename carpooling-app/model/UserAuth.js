import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const authSchema = new mongoose.Schema({
  UserId: {
    type: String,
    default: uuidv4,
  },
  UserName: {
    type: String,
    required: "The title field is required.",
  },
  UserEmail: {
    type: String,
    required: "The Details field is required.",
  },
  Password: {
    type: String,
    required: "Starting Location is required.",
  },
});
const UserAuth = mongoose.model("UserAuth", authSchema);

export default UserAuth;
