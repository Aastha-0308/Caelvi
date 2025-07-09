import mongoose from "mongoose";
import slugify from "slugify";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

const nestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [100, "Title must be at most 100 characters"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: null,
      trim: true,
      maxlength: [500, "Description must be at most 500 characters"],
    },
    createdBy: {
      type: Number,
      ref: "User",
      required: true,
    },
    echo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Echo",
      },
    ],
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


nestSchema.pre("save", function (next) {
  if (this.isNew) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    this.slug = `${baseSlug}-${nanoid()}`;
  }
  next();
});

nestSchema.virtual("url").get(function () {
  return `/nest/${this.slug}`;
});

// Indexes
nestSchema.index({ createdBy: 1, title: 1 }, { unique: true }); // Unique title per user


const Nest = mongoose.model("Nest", nestSchema);
export default Nest;