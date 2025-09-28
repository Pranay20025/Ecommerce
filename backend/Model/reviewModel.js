import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  description: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const Review = mongoose.model("Review", reviewSchema);
