import React from 'react';
import { FaUserCircle } from 'react-icons/fa';  
import './Navbar.css';  
import logo from "../../assets/nav-logo.svg"
import { Link } from 'react-router-dom';  
import {useSelector,useDispatch} from "react-redux"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { setAuthUser } from '../../redux/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutHandler = async () =>{
    try {
      const response = await  axios.post("http://localhost:8000/api/v1/user/logout",{},{
        withCredentials:true
      });
      if(response.data.success){
        dispatch(setAuthUser(null));
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  const {user} = useSelector(store=>store.auth);
  return (
    <nav className="navbar">
      <div className="navbar_left">
        <img src={logo} alt="Logo" className="navbar_logo" width={200}/>
      </div>
      <div className="navbar_right">
       {
        user ? <><button onClick={onLogoutHandler}>Logout</button></>:<> <Link to={"/admin/login"} className="link-button"><button>Login</button></Link></>
       }
        <FaUserCircle className="navbar_profile_icon" />
      </div>
    </nav>
  );
};

export default Navbar;
