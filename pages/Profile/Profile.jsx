import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Order from '../../components/Order/Order'
import "./Profile.css"
import { Outlet } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='Profile'>
      <div className="sidebar_section">
        <Sidebar/>
      </div>
      <div className='main_section'>
       <Outlet/>
      </div>
    </div>
  )
}

export default Profile