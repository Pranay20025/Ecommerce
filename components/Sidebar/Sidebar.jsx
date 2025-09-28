import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul>
        <Link to={"/profile"}><li>Orders</li></Link>
        <Link to={"/profile/fav"}><li>Bookmark</li></Link>
      </ul>
    </div>
  );
};

export default Sidebar;
