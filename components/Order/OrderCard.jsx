import React from 'react'
const url = "http://localhost:8000/uploads/"

const OrderCard = ({ item }) => (
  <div className='order-card'>
    <img src={ url + item.product.image }  />
    <div className='order-details'>
      <h3>{item.product.name}</h3>
      <p>Status: {item.status}</p>
      <p>Price: ${item.product.price}</p>
    </div>
  </div>
);

export default OrderCard