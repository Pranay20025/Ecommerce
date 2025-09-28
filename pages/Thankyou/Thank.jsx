import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Thank.css';  // Import the CSS file for styling

const Thank = () => {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate('/');
  };

  return (
    <div className="thank-container">
      <div className="thank-message">
        <h1>Thank You for Shopping!</h1>
        <p>Your order has been placed successfully.</p>
        <button onClick={handleExploreMore} className="explore-button">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Thank;
