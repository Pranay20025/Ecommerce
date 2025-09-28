import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'

const Item = ({item}) => {
  const url = "http://localhost:8000/uploads/";
  return (
       <div className='item'>
      <Link to={`/product/${item._id}`}><img onClick={window.scrollTo(0,0)} src={url+item.image} alt={item.name} /></Link>
      <p style={{fontWeight:"700"}}>{item.name}</p>
      <div className="price">
      <p className='new_price'>${item.price}</p>
      <p className='cancel'>${item.oldPrice}</p>
      </div>
    </div>
   
  )
}

export default Item