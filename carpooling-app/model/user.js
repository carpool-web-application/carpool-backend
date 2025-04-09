import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { type } from "os";

const user = new mongoose.Schema({
  UserId: {
    type: String,
    default: uuidv4,
  },
  userName: {
    type: String,
    required: [true, "User Name is required"],
    unique: true,
  },
  userEmail: {
    type: String,
    required: [true, "User Email is required"],
    unique: true,
  },
  userPassword: {
    type: String,
    required: [true, "User Password is required"],
  },
  PhoneNumber: {
    type: String,
    required: [true, "User Phone Number is required"],
  },
  commuterType: {
    type: String,
    enum: ["Driver", "Rider", "Admin"],
  },
  driverDetails: {
    licenseNumber: {
      type: String,
    },
    vehicle: {
      make: String,
      model: String,
      year: Number,
      plateNumber: String,
    },
    availability: {
      type: Boolean,
      default: false,
    },
  },
  commuterPreference: {
    preferredDriverGender: {
      type: String,
      enum: ["male", "female", "any"],
    },
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
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

const userSchema = mongoose.model("user", user);

export default userSchema;
