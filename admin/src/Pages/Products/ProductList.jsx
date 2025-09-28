import React from 'react';
import "./ProductList.css";
import useFetchProducts from '../../hooks/useFetchProducts';
import { useSelector } from 'react-redux';
import axios from "axios"
import { MdDeleteOutline } from 'react-icons/md'; 


const ProductList = () => {
  useFetchProducts();
  const {products} = useSelector(store=>store.product);
  const url = "http://localhost:8000/uploads/";
  
  const onDeleteHandler = async (urll) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/product/deleteproduct/${urll}`,
        {},
        { withCredentials: true }
      );
      
      if (response.data.success) {
        alert("Item removed from Product List");
      } else {
        alert("Failed to remove item from Product List");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while removing the item");
    }
  };
  
  return (
    <div className="product-list-container">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Old Price</p>
        <p>Category</p>
        <p>Type</p>
        <p>Remove</p>
      </div>
      <hr style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }} />
      <div className="product-list">
        {products.map((e) => {
          return (
            <div key={e._id}>
              <div className="cartitems-format">
                <img className="imgg" src={url+e.image} alt={e.name} />
                <p>{e.name}</p>
                <p>${e.price}</p>
                <p>${e.oldPrice}</p>
                <p>{e.category}</p>
                <p>{e.type}</p>
                <MdDeleteOutline className='deletee-icon' onClick={()=>{onDeleteHandler(e._id)}} />
              </div>
              <hr style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
