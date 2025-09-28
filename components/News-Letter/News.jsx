import React from 'react'
import "./News.css"
const News = () => {
  return (
    <div className='news'>
      <div className="news_container">
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newletter and stay updated</p>
        <div className="press">
        <input type="text" placeholder='Enter Your Email' />
        <button>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default News