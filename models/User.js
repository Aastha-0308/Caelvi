import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';
import getDefaultProfilePhoto from "../utils/getPic.js";
const generateOTP = customAlphabet('0123456789', 6); 

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      trim: true,
      lowercase: true,
      minlength: [1, "Minimum 3 characters"],
      maxlength: [20, "Maximum 30 characters"],
      match: [
        /^[a-z][a-z0-9_-]{0,19}$/,
        "Must start with a letter and contain only lowercase letters, numbers, underscores, or dashes",
      ],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    profilePhoto: {
      type: String,
      trim: true,
      default: function(){ return getDefaultProfilePhoto(this.username)}
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      default: function () {
        return generateOTP();
      }

    },
    bio: {
      type: String,
      trim: true,
      default: null,
      maxlength: [300, "Bio must be 300 characters or less"],
    },
    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
        delete ret.password; // Never expose password
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);
export default User;
