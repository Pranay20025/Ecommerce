import { Order } from "../Model/orderModel.js";
import { Product } from "../Model/productModel.js";
import { User } from "../Model/userModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.id; // Assumed to be set by authentication middleware
    const productId = req.params.id;
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
 
    const order = new Order({
      user: userId,
      product: productId,
      status: "Processing",
    });

    user.orders.push(order._id);
    await user.save();
    await order.save();

    const populatedOrder = await Order.findById(order._id).populate("user", "name email").populate("product", "name price image");
    return res.status(201).json({
      message: "Order created successfully",
      success: true,
      populatedOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating order", success: false });
  }
};

export const fetchOrdersOfUser = async (req, res) => {
  try {
    const userId = req.id; 

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate("product", "name price image"); 

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json({ message: "Orders found", success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching orders", success: false });
  }
};


export const fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("product", "name price image").populate("user", "name email");
    return res.status(200).json({
      orders,
      message: "Orders fetched successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching orders", success: false });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.id;
    if(!userId){
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Order status is required" });
    }

    const allowedStatuses = ["Processing", "Dispatch", "Delivered"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "Order updated successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating order", success: false });
  }
};

