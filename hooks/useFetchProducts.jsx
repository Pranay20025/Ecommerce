import { useEffect } from "react"
import {useDispatch} from "react-redux"
import axios from "axios"
import { setProduct } from "../redux/productSlice";

const useFetchProducts = async () =>{

  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchAllProducts = async () =>{
    try {
    const response = await axios.get("http://localhost:8000/api/v1/product/fetchproducts",{withCredentials:true});
    if(response.data.success){
      dispatch(setProduct(response.data.products));
    }    
    } catch (error) {
      console.log(error);
    }
    }
    fetchAllProducts();
  },[dispatch])
}

export default useFetchProducts;