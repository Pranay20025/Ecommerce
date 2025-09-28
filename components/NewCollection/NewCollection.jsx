import React from 'react'
import Item from '../Item-Card/Item';
import {useSelector} from "react-redux"
import useFetchProducts from '../../hooks/useFetchProducts';

const NewCollection = () => {
  useFetchProducts();
  const {products} = useSelector(store=> store.product);
  const selectedProducts = products.filter(product => product.type === "New");
  return (
    <div className='popular'>
      <div>
        <h1>New Collection</h1>
        <hr />
      </div>
      <div className='popular-container'>
        {selectedProducts.map((product) => (
          <Item item={product}></Item>
        ))}
      </div>
    </div>
  )
}

export default NewCollection