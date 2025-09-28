import React from 'react';
import './Order.css';
import OrderCard from './OrderCard';
import { useSelector } from 'react-redux';
import useFetchOrderItems from '../../hooks/useFetchOrderItems';

const Order = () => {
  useFetchOrderItems();
  const {order = []} = useSelector(store=>store.product);
  return (
    <div className='order'>
      <center><h1>My Orders</h1></center>
      <div className='order-list'>
        {order.map(item => (
          <OrderCard 
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Order;
