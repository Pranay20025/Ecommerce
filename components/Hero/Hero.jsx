import React from 'react';
import hero from "./hero_image.png";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="left_text">
        <h3>New Arrivals Only</h3>
        <h1>New 👋</h1>
        <h1>Collections</h1>
        <h1>for everyone</h1>
        <button>Latest Collection</button>
      </div>
      <div className="right_image">
        <img src={hero} alt="hero" width={400}/>
      </div>
    </div>
  );
};

export default Hero;
