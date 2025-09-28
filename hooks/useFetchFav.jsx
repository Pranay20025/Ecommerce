import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setFav } from "../redux/productSlice";

const useFetchFav = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/fetchfav",
          { withCredentials: true }
        );
        if (response.data.success) {
          console.log(response.data.favItems);
          dispatch(setFav(response.data.favItems));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavItems();
  }, [dispatch]);
};

export default useFetchFav;
