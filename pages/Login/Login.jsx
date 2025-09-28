import React, { useState } from "react";
import "./Login.css"; // Assuming you have a separate CSS file
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthUser } from "../../redux/authSlice";
import {useDispatch} from "react-redux"

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData , setFormData] = useState({
    email: "",
    password: "",
  })

   const onChangeHandler = async (event) =>{
    const {name , value} = event.target;
    setFormData({...formData, [name]:value});
   }

   const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/login",formData,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      });
      if(response.data.success){
        dispatch(setAuthUser(response.data.user));
        navigate("/");

      }
    } catch (error) {
      console.log(error); 
    }
   }
  return (
    <div className="login">
      <div className="login__container">
        <h2>Login</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              placeholder="Enter your password"
              required
            />
          </div>
          <p>Don't have an Account? <Link to={"/signup"}>Signup</Link></p>
          <button type="submit" className="login__button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
