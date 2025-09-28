import React from 'react';
import { useSelector } from 'react-redux';
import useFetchFav from '../../hooks/useFetchFav';
import FavCard from '../Order/FavCard';
import "./Fav.css"

const Fav = () => {
  useFetchFav();
  const { fav = [] } = useSelector(store => store.product); 

  return (
    <div className='fav'>
      <center><h1>My Wishlist</h1></center>
      <div className='fav-list'>
        {fav.length > 0 ? (
          fav.map(fa => (
            <FavCard key={fa._id} item={fa} /> 
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </div>
    </div>
  );
};

export default Fav;
