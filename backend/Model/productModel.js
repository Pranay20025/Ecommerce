import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Men", "Women", "Kids"],
    required: true,
  },
  type: {
    type: String,
    enum: ["New", "Popular", "Default"],
    required: true,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  }],
  image: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
