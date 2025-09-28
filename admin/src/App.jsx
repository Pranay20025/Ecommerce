import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ProductList from './Pages/Products/ProductList'
import AddProduct from './Pages/AddProduct/AddProduct'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import "./App.css"
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Order from './Pages/Orders/Order'
import ProtectedRoutes from './components/ProtectedRoutes'


const App = () => {
  return (
<div>
  
<div className='main_section'>
      <Navbar/>
    <div className='second_main_section'>
      <div className='sidebar_section'>
        <Sidebar/>
      </div>
      <div className='layout_section'>
      <Routes>
        <Route index path="/admin" element={<ProtectedRoutes><ProductList/></ProtectedRoutes>} />
        <Route path="/admin/add" element={<ProtectedRoutes><AddProduct/></ProtectedRoutes>} />
        <Route path="/admin/order" element={<ProtectedRoutes><Order/></ProtectedRoutes>} />
        <Route index path="/admin/login" element={<Login/>} />
        <Route path="/admin/signup" element={<Signup/>} />
      </Routes>
      </div>
    </div>
    </div>
</div>
  )
}

export default App