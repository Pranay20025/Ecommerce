import React, { useState } from "react"; 
import "./Navbar.css"; 
import { FaUserCircle } from "react-icons/fa"; 
import { IoCartOutline } from "react-icons/io5";
import logo from "./logo.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAuthUser } from "../../redux/authSlice";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname); 

  const dispatch = useDispatch();

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const onLogoutHandler = async () =>{
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/logout",{},{
        withCredentials:true
      });
      if(response.data.success){
        dispatch(setAuthUser(null));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to={"/"}><img src={logo} alt="Logo" className="navbar__logo" /></Link>
        <Link className="navbar__title" to={"/"}><h1 className="navbar__title">Shopify</h1></Link>       
      </div>
      <div className="navbar__center">
        <ul className="navbar__menu">
          <li>
            <Link to="/" 
              className={activeLink === "/" ? "active" : ""}
              onClick={() => handleLinkClick("/")}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link to="/men" 
              className={activeLink === "/men" ? "active" : ""}
              onClick={() => handleLinkClick("/men")}
            >
              Men
            </Link>
          </li>
          <li>
            <Link to="/women" 
              className={activeLink === "/women" ? "active" : ""}
              onClick={() => handleLinkClick("/women")}
            >
              Women
            </Link>
          </li>
          <li>
            <Link to="/kids" 
              className={activeLink === "/kids" ? "active" : ""}
              onClick={() => handleLinkClick("/kids")}
            >
              Kids
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar__right">
       <Link to={"/cart"}><IoCartOutline className="navbar__cartIcon" /></Link>
      {
        user? <> <button className="navbar__loginButton" onClick={onLogoutHandler}>Logout</button></>:<> <Link to={"/login"}><button className="navbar__loginButton">Login</button></Link></>
      }
      <Link to={"/profile"}><FaUserCircle className="navbar__profileIcon" /></Link>
      </div>
    </nav>
  );
};

export default Navbar;
