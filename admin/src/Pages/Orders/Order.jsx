import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useFetchOrders from '../../hooks/useFetchOrders';
import "./Order.css"
import axios from 'axios';
import OrderCard from './OrderCard';

const Order = () => {
  useFetchOrders();
  const {orders=[]} = useSelector(store=>store.product);
 
  return (
    <div className="order-list-container">
      <div className="order-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>User Name</p>
        <p>User Email</p>
        <p>Status</p>
        <p>Update</p>
      </div>
      <hr style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }} />
      <div className="order-list">
        {orders.map((e) => {
          return (
            <OrderCard e={e}/>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
