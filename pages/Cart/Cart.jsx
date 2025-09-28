import React, { useEffect, useState } from 'react'
import "./Cart.css"
import useFetchCartItems from '../../hooks/useFetchCartItems';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteOutline } from 'react-icons/md'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  useFetchCartItems();
  const {cart = []} = useSelector(store=>store.product);
  const url = "http://localhost:8000/uploads/"
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total); 
  }, [cart]);

  const onDeleteHandler = async (urll) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/removefromcart/${urll}`,
        {},
        { withCredentials: true }
      );
      
      if (response.data.success) {
        alert("Item removed from Cart");
      } else {
        alert("Failed to remove item from favorites");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while removing the item");
    }
  };
  
  const onCheckoutHandler = async () =>{
      cart.forEach(async(item)=> {
      try {
        const response = await axios.post(`http://localhost:8000/api/v1/user/order/${item._id}`,{},{withCredentials:true});
        if(response.data.success){
          onDeleteHandler(item._id);
        }
      } catch (error) {
        console.log(error);  
      }
      });
      navigate("/address");
    }

  return (
    <div className='main_cart_container'>
    <div>
    <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr style={{width:"80%" , marginLeft:"10%" , marginRight:"10%"}}/>
     {cart.map((e)=>{
       return (
          <div>
          <div className="cartitems-format">
            <img className='imgg' src={url+e.image} alt="" />
            <p>{e.name}</p>
            <p>${e.price}</p>
            <p className='cartitems-quantity'>1</p>
            <p>${e.price}</p>
            <MdDeleteOutline className='deletee-icon' onClick={()=>{onDeleteHandler(e._id)}} />
          </div>
          <hr style={{width:"80%" , marginLeft:"10%" , marginRight:"10%"}}/>
        </div>
        )
     })}
    </div>
      <div className="cart-offers">
        <div className="cart-total">
          <h1>Cart Total</h1>
          <hr />
          <div>
            <p>Total:</p>
            <p>${totalPrice}</p>
          </div>
          <hr />
          <div>
            <p>Delivery Fee:</p>
            <p>$2.00</p>
          </div>
          <hr />
          <div>
            <p>Subtotal:</p>
            <p>${totalPrice + 2}</p>
          </div>
          <button onClick={onCheckoutHandler}>Checkout</button>
        </div>
        <div className="cart-promo">
          <p>If you have a promo code, Enter it here</p>
          <div>
            <input type="text" placeholder='promocode' />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart