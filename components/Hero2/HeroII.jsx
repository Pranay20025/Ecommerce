import React from 'react'
import hero from "../../assets/exclusive_image.png"
const HeroII = () => {
  return (
    <div className="hero">
      <div className="left_text">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <button>Shop Now</button>
      </div>
      <div className="right_image">
        <img src={hero} alt="hero" width={300}/>
      </div>
    </div>
  )
}

export default HeroII