import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCart } from "../redux/productSlice";  // Adjust the path if needed

const useFetchCartItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/user/fetchcart", { withCredentials: true });
        if (response.data.success) {
          dispatch(setCart(response.data.cartItems));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems();
  }, [dispatch]);  // Only re-run the effect if dispatch changes
};

export default useFetchCartItems;
