import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Shop from './pages/Shop/Shop'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ShopCategory from './pages/ShopCategory/ShopCategory'
import banner_man from "./assets/banner_mens.png"
import banner_wom from "./assets/banner_women.png"
import banner_kid from "./assets/banner_kids.png"
import Cart from './pages/Cart/Cart'
import Profile from './pages/Profile/Profile'
import Product from './pages/Product/Product'
import Order from './components/Order/Order'
import Fav from './components/Fav/Fav'
import Address from './pages/Address/Address'
import Thank from './pages/Thankyou/Thank'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <>
  <Navbar></Navbar>
  <Routes>
    <Route path='/'>
    <Route index element={<Shop/>}></Route>
    <Route path='/men' element={<ShopCategory banner={banner_man} category="Men"/>}></Route>
    <Route path='/women' element={<ShopCategory banner={banner_wom} category="Women"/>}></Route>
    <Route path='/kids' element={<ShopCategory banner={banner_kid} category="Kids"/>}></Route>
    <Route path='/cart' element={<ProtectedRoutes><Cart/></ProtectedRoutes>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/product/:productId' element={<Product/>}></Route>
    <Route path='/address' element={<ProtectedRoutes><Address /></ProtectedRoutes>} />
    <Route path='/thankyou' element={<ProtectedRoutes><Thank /></ProtectedRoutes>} />
    <Route path='/profile'element={<ProtectedRoutes><Profile/></ProtectedRoutes>}>
    <Route index element={<Order/>}/>
    <Route path='/profile/fav' element={<Fav/>}/>
    </Route>  
    </Route>    
  </Routes>
  <Footer></Footer>
    </>
  )
}

export default App
