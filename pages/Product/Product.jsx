import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Product.css";
import Popular from '../../components/Popular/Popular';
import { useSelector } from 'react-redux';
import useFetchProducts from '../../hooks/useFetchProducts';
import axios from 'axios';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'; // Import the bookmark icon

const Product = () => {
  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      review: 'This product is amazing.',
    },
    {
      id: 2,
      name: 'Jane Doe',
      rating: 4,
      review: 'This product is good.',
    },
  ];

  useFetchProducts();
  const url = "http://localhost:8000/uploads/";
  const { productId } = useParams();
  const { products } = useSelector(store => store.product);
  const selectedProduct = products.find((product) => product._id === productId);
  const [buyBtn, setBuyBtn] = useState(false);
  const [wishList, setWishList] = useState(false);

   useEffect(()=>{
    const fetchStatusCart = async () =>{
      try {
        const response = await axios.post(
          `http://localhost:8000/api/v1/user/fetchStatusCart/${productId}`,
          {},
          { withCredentials: true }
        );
        if(response.data.success){
          const status = response.data.status;
          setBuyBtn(status);
        } 
      } catch (error) {
        console.log(error);  
      }
    }
    const fetchStatusFav = async () =>{
      try {
        const response = await axios.post(
          `http://localhost:8000/api/v1/user/fetchStatusFav/${productId}`,
          {},
          { withCredentials: true }
        );
        if(response.data.success){
          const status = response.data.status;
          setWishList(status);
        } 
      } catch (error) {
        console.log(error);  
      }
    }
    fetchStatusFav();
    fetchStatusCart();
   },[productId]);
  
  const onBuyHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/addtocart/${selectedProduct._id}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        const status = response.data.status;
        alert("Product added to cart");
        setBuyBtn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onBookmarkHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/addtofav/${selectedProduct._id}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setWishList(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {selectedProduct ? (
        <div className='product_page'>
          <div className='product_section'>
            <div className='product_image'>
              <img src={url + selectedProduct.image} alt="" width={500} />
            </div>
            <div className='product_info'>
              {wishList?<><FaBookmark className="bookmark_icon" /></>:<><FaRegBookmark className="bookmark_icon" onClick={onBookmarkHandler}/></>}
              <h1>{selectedProduct.name}</h1>
              <h3>Price: ${selectedProduct.price}</h3>
              <h3 className='old_price'>Old Price: ${selectedProduct.oldPrice}</h3>
              <p>
               {selectedProduct.description}
              </p>
              <button onClick={onBuyHandler}>
                {buyBtn ? <>Added To Cart</> : <>Buy Now</>}
              </button>
            </div>
          </div>
          
          <div className='product_review_section'>
            <h3>Reviews</h3>
            <div className="review_container">
              <div className="review_card">
                {reviews.map((review) => (
                  <div key={review.id}>
                    <p>{review.name}</p>
                    <p>Rating: {review.rating}/5</p>
                    <p>{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="review_input_section">
              <input type="text" placeholder='Write your review' />
              <button>Submit</button>
            </div>
          </div>
          <div>
            <Popular></Popular>
          </div>
        </div>
      ) : (
        <p>Not Available</p>
      )}
    </div>
  );
};

export default Product;
