import express from "express"
import { addToCart, addToFav,  cartProductStatus,  favProductStatus,  fetchCartItems,  fetchFavItems, login, logout, removeFromCart, removeFromFav, signup } from "../Controller/userController.js";
import { createOrder, fetchOrdersOfUser, fetchOrders, updateOrder } from "../Controller/orderController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const userRouter = express.Router();

userRouter.post("/login",login);
userRouter.post("/signup", signup);
userRouter.post("/logout",logout);
userRouter.post("/addtocart/:id",isAuthenticated,addToCart);
userRouter.post("/fetchStatusCart/:id",isAuthenticated,cartProductStatus);
userRouter.post("/removefromcart/:id",isAuthenticated,removeFromCart);
userRouter.post("/addtofav/:id",isAuthenticated,addToFav);
userRouter.post("/fetchStatusFav/:id",isAuthenticated,favProductStatus);
userRouter.post("/removefromfav/:id",isAuthenticated,removeFromFav);
userRouter.post("/order/:id",isAuthenticated,createOrder);
userRouter.get("/orders",isAuthenticated, fetchOrders);
userRouter.get("/myorders",isAuthenticated,fetchOrdersOfUser);
userRouter.post("/order/update/:id",isAuthenticated, updateOrder);
userRouter.get("/fetchcart",isAuthenticated,fetchCartItems);
userRouter.get("/fetchfav",isAuthenticated,fetchFavItems);


export default userRouter;
