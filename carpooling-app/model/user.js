import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const user = new mongoose.Schema({
  UserId: {
    type: String,
    default: uuidv4,
  },
  userName: {
    type: String,
    required: "UserName is required.",
  },
  userEmail: {
    type: String,
    required: "UserEmail is required.",
  },
  userPassword: {
    type: String,
    required: "Password is required.",
  },
  commuterType: {
    type: String,
    // required: 'Commuter Type is required.'
  },
});

const userSchema = mongoose.model("userAuths", user);
export default userSchema;
