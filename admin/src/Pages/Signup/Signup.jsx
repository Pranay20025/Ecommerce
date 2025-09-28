import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Signup = () => {

  const navigate = useNavigate();
   
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
  });

  const onChangeHandler = async (event) =>{
    const {name , value} = event.target;
    setFormData({...formData, [name]:value});
  }
  
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/signup",formData,{
        headers:{
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if(response.data.success){
        navigate("/admin");
      }
      setFormData({
        name:"",
        email:"",
        password:"",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
    <div className="login__container">
      <h2>Signup</h2>
      <form onSubmit={onSubmitHandler}>
      <div className="form__group">
          <label htmlFor="username">Username</label>
          <input
            type='text'
            id="username"
            name='name'
            placeholder="Enter your Username"
            value={formData.name}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name='email'
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
            name='password'
            value={formData.password}
            onChange={onChangeHandler}
            placeholder="Enter your password"
            required
          />
        </div>
        <p>Already have an Account? <Link to={"/admin/login"}>Login</Link></p>
        <button type="submit" className="login__button">
          Signup
        </button>
      </form>
    </div>
  </div>
  )
}

export default Signup