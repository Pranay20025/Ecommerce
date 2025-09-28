import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOrders } from "../redux/productSlice";

const useFetchOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/orders",
          { withCredentials: true }
        );
        if (response.data.success) {
          console.log(response.data.orders);
          dispatch(setOrders(response.data.orders));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [dispatch]); // The dependency array ensures that fetchOrders runs only once on component mount
};

export default useFetchOrders;
