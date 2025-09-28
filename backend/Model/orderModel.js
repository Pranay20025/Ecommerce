import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  status:{
    type:String,
    enum: ["Processing", "Dispatch", "Delivered"],
    default:"Processing"
  }
});

export const Order = mongoose.model("Order",orderSchema);