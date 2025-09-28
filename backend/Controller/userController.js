import  jwt  from "jsonwebtoken";
import { User } from "../Model/userModel.js";
import bcrypt from "bcrypt"


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.json({ success: true, message: "User created successfully", user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);  // Fixed comparison
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Login successfully",
        user,
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
};
export const logout = (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error logging out" });
  }
};
export const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "Login first" });
    }

    const isAdded = user.cart.includes(productId);
    if (isAdded) {
      return res.json({ success: false, message: "Product is already in your cart" });
    }

    user.cart.push(productId);
    await user.save();

    return res.status(200).json({ success: true, message: "Item added to your cart" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

export const cartProductStatus = async (req,res) =>{
  try {
    const userId = req.id;
    const productId = req.params.id;
    const user = await User.findById(userId);
    if(!user){
      return res.json({ success: false, message: "Login first" });
    }
    const status = user.cart.includes(productId);
    return res.status(200).json({success:true, status});
  } catch (error) {
    console.log(error);
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "Login first" });
    }

    const isThere = user.cart.includes(productId);
    if (isThere) {
      user.cart.pull(productId);
      await user.save();
      return res.status(200).json({ success: true, message: "Item removed from your cart" });
    }

    return res.json({ success: false, message: "Product is not in your cart" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};
export const addToFav = async (req, res) => {
  try {
    const productId  = req.params.id;
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "Login first" });
    }

    const isAdded = user.fav.includes(productId);
    if (isAdded) {
      return res.json({ success: false, message: "Product is already in your favourites" });
    }

    user.fav.push(productId);
    await user.save();
    return res.status(200).json({ success: true, message: "Item added to your favourites" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error adding to favourites" });
  }
};

export const favProductStatus = async (req,res) =>{
  try {
    const userId = req.id;
    const productId = req.params.id;
    const user = await User.findById(userId);
    if(!user){
      return res.json({ success: false, message: "Login first" });
    }
    const status = user.fav.includes(productId);
    return res.status(200).json({success:true, status});
  } catch (error) {
    console.log(error);
  }
}

export const removeFromFav = async (req, res) => {
  try {
    const productId  = req.params.id;
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "Login first" });
    }

    const isThere = user.fav.includes(productId);
    if (isThere) {
      user.fav.pull(productId);
      await user.save();
      return res.status(200).json({ success: true, message: "Item removed from your favourites" });
    }

    return res.json({ success: false, message: "Product is not in your favourites" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error removing from favourites" });
  }
};
export const fetchCartItems = async (req, res) => {
  try {
    const userId = req.id;
    
    const user = await User.findById(userId).populate("cart"); 

    if (!user) {
      return res.status(401).json({ success: false, message: "Please login first" });
    }

    const cartItems = user.cart;

    return res.status(200).json({ success: true, cartItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const fetchOrderItems = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate("orders")

    if (!user) {
      return res.status(401).json({ success: false, message: "Please login first" });
    }

    const orderItems = user.orders; 
    return res.status(200).json({ success: true, orderItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const fetchFavItems = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const user = await User.findById(userId).populate('fav'); 

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const favItems = user.fav;

    return res.status(200).json({ success: true, favItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};