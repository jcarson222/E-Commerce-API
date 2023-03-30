const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Provide review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Provide review text"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide a product"],
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
// ^^^ this makes it so a user can only post one review/product.

module.exports = mongoose.model("Review", ReviewSchema);
