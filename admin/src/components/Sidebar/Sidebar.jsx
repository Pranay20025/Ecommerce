import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  return (
    <div className='sidebar'>
      <ul>
        <Link to="/admin" onClick={() => setActiveLink('/admin')}>
          <li className={activeLink === '/' ? 'active' : ''}>Product List</li>
        </Link>
        <Link to="/admin/add" onClick={() => setActiveLink('/admin/add')}>
          <li className={activeLink === '/admin/add' ? 'active' : ''}>Add Product</li>
        </Link>
        <Link to="/admin/order" onClick={() => setActiveLink('/admin/order')}>
          <li className={activeLink === '/admin/order' ? 'active' : ''}>Order</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
