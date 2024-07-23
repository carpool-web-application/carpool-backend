import mongoose from "mongoose";

const user = new mongoose.Schema({
  userId: {
    type: Number,
  },
userName: {
    type: String,
    required: 'UserName is required.'
  },
  userEmail: {
    type: String,
    required: 'UserEmail is required.'
  },
  userPassword: {
    type: String,
    required: 'Password is required.'
  },
  commuterType: {
    type: String,
   // required: 'Commuter Type is required.'
  },
 
});

const userSchema = mongoose.model("userAuths", user);
export default userSchema;
