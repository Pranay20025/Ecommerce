import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  }],
  fav: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
