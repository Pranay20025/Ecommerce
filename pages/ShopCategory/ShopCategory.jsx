import React from 'react'
import Item from '../../components/Item-Card/Item';
import "./ShopCategory.css"
import { useSelector } from 'react-redux';
import useFetchProducts from '../../hooks/useFetchProducts';

const ShopCategory = ({banner, category}) => {
useFetchProducts();
const {products} = useSelector(store => store.product);
const selectedProducts = products.filter(product => product.category === category);
  return (
    <div>
      <img src={banner} alt={category} />
      <div className='showing'>
        <p>Showing 1-12 out of 36 products</p>
        <select name="" id="">
          <option value="">Sort by</option>
        </select>
      </div>
      <div>
      <div className='popular-container'>
        {selectedProducts.map((product) => (
          <Item item={product}></Item>
        ))}
      </div>
      </div>
      <div className='explore'>
        <button>Explore</button>
      </div>
    </div>
  )
}

export default ShopCategory