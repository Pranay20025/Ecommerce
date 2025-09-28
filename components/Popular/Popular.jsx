import React from 'react';
import './Popular.css';
import Item from '../Item-Card/Item';
import useFetchProducts from '../../hooks/useFetchProducts';
import {useSelector} from "react-redux"


const Popular = () => {
  useFetchProducts();
  const {products} = useSelector(store => store.product);
  const selectedproducts = products.filter(product => product.type === "Popular");
  return (
    <div className='popular'>
      <div>
        <h1>Popular</h1>
        <hr />
      </div>
      <div className='popular-container'>
        {selectedproducts.map((product) => (
          <Item item={product}></Item>
        ))}
      </div>
    </div>
  );
};

export default Popular;
