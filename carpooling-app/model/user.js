import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

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

user.pre("save", function (next) {
  if (!this.isModified("userPassword")) return next();

  bcrypt.hash(this.userPassword, 10, (err, hash) => {
    if (err) return next(err);

    this.userPassword = hash;
    next();
  });
});

user.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.userPassword, (err, hash) => {
    if (err) return callback(err);
    callback(null, hash);
  });
};

const userSchema = mongoose.model("userAuths", user);

export default userSchema;
