import { Product } from "../Model/productModel.js";
import { Review } from "../Model/reviewModel.js";

export const createReview = async (req, res) => {
  try {
    const userId = req.id;
    const productId = req.params.id;
    const { review } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newReview = new Review({
      user: userId,
      product: productId,
      review,
    });

    await newReview.save();
    return res.status(201).json({
      message: 'Review posted successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating review' });
  }
};


export const fetchReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.find({ productId }).populate({ path: 'user', select: 'name' });
    return res.status(200).json({
      success: true,
      reviews,
      message: 'Fetched Reviews',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching reviews' });
  }
};