import mongoose from "mongoose";
import slugify from "slugify";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

const echoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Echo title is required"],
      trim: true,
      maxlength: [100, "Title must be at most 100 characters long"],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: null,
      maxlength: [500, "Description must be at most 500 characters long"],
    },

    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },

    createdBy: {
      type: Number,
      ref: "User",
      required: [true, "Creator ID is required"],
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

echoSchema.pre("save", function (next) {
  if (this.isNew) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    this.slug = `${baseSlug}-${nanoid()}`;
  }
  next();
});

echoSchema.virtual("url").get(function () {
  return `/echo/${this.slug}`;
});


const Echo = mongoose.model("Echo", echoSchema);
export default Echo;
