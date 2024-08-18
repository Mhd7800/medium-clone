import React from 'react'
import { useState, useEffect } from 'react';
import "./css/RegisterWithEmail.css"
import axios from 'axios';
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function RegisterWithEmail() {

  let navigate = useNavigate();

  //initialize user data 
  const [formData, setFormData] = useState({
    name:'',
    username: '',
    email: '',
    password:'',
  });
  const [error, setError] = useState(null);
  


  // state for user registartion success
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state for registration status
  
  //wait 3ms before redirecting the user
  useEffect(() => {
    if (registrationSuccess) {
      const redirectTimeout = setTimeout(() => {
        // Redirect the user to a logged-in page after a delay
        navigate('/sigin');
      }, 1000); // Redirect after 1 second 

      return () => clearTimeout(redirectTimeout); // Clear the timeout if component unmounts
    }
  }, [registrationSuccess]);

  // Register the user using axios
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", formData);
     
      setRegistrationSuccess(true); // Set registration success to true
      console.log(response.message)
    } catch (error) {
      //console.log(response)
      setError('error')
      //console.error('Registration error:', error);

    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      {error}
      {registrationSuccess && ( // Conditionally render success message
        <div style={{color:"green"}} className="registrationSuccessMessage">{formData.username} Registered successfully!  You will be redirected to the login page shortly</div>
      )}
      <form className="registerForm" onSubmit={handleSubmit} >

                <input type="text" id='name' placeholder='Name' name="name" value={formData.name} onChange={handleChange} autoComplete='off' required/>
                <input type="text" id='username' placeholder='Username' name="username" value={formData.username} onChange={handleChange} autoComplete='off' required/>
                <input type="email" placeholder='Email' name="email" value={formData.email} onChange={handleChange} autoComplete='off' required/>
                <input  type='password' name='password' placeholder='Your password' value={formData.password} onChange={handleChange} autoComplete='off' required/>
                <button className="loginButton" type="submit">
                Register
                </button>
            </form>
    </div>
  )
}
