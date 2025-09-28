import React from 'react';
import { MdDeleteOutline } from 'react-icons/md'; 
import "./FavCard.css";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const FavCard = ({item}) => {
  const url = "http://localhost:8000/uploads/";
  const navigate = useNavigate();

  const onDeleteHandler = async (e) => {
    e.stopPropagation(); 
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/removefromfav/${item._id}`,
        {},
        { withCredentials: true }
      );
      
      if (response.data.success) {
        alert("Item removed from favorites");
      } else {
        alert("Failed to remove item from favorites");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while removing the item");
    }
  };
  
  return (
    <div className='fav-card' onClick={()=>navigate(`/product/${item._id}`)}>
      <img src={url + item.image} alt={item.name} />
      <div className='fav-details'>
        <h3>{item.name}</h3>
        <p>Old Price: ${item.oldPrice}</p>
        <p>Price: ${item.price}</p>
      </div>
      <MdDeleteOutline className='delete-icon' onClick={onDeleteHandler} />
    </div>
  );
}

export default FavCard;
