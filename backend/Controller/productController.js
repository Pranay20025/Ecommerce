import { Product } from "../Model/productModel.js";
import { User } from "../Model/userModel.js";

export const createProduct = async (req, res) => {
  try {
    // Check if req.file is present
    if (!req.file) {
      console.error("No file uploaded.");
      return res.status(400).json({ message: 'Image upload failed' });
    }
    
    // Continue with product creation logic
    const image_filename = req.file.filename;
    const { name, price, oldPrice, category, type, description } = req.body;

    if (!name || !price || !oldPrice || !category || !type || !description) {
      console.error("Missing fields:", { name, price, oldPrice, category, type, description });
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const product = new Product({
      name,
      price,
      oldPrice,
      category,
      type,
      image: image_filename,
      description,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', success:true, product });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({
      products,
      message: 'Products fetched successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { category, type } = req.body;

    const product = await Product.findByIdAndUpdate(productId, {
      category: category,
      type: type,
    }, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const removeProduct = async (req,res) =>{
  try {
    const userId = req.id;
    const productId = req.params.id;
    if(!userId){
      return res.status(401).json({message: 'Unauthorized', success: false});
    }
    const product = await Product.findByIdAndDelete(productId);
    if(!product){
      return res.status(404).json({message: 'Product not found', success: false});
    }
    return res.status(200).json({message: 'Product deleted successfully', success: true});
  } catch (error) {
    console.log(error);
   }
}
