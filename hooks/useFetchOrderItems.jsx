import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOrder } from "../redux/productSlice";

const useFetchOrderItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/myorders",
          { withCredentials: true }
        );
        if (response.data.success) {
          console.log(response.data.orders);
          dispatch(setOrder(response.data.orders));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderItems();
  }, [dispatch]);  
};

export default useFetchOrderItems;
