import React from 'react'
import { useState } from 'react';
import "./css/RegisterWithEmail.css"

export default function RegisterWithEmail() {

  /*const [formData, setFormData] = useState({
    username: '',
    email: '',
    password,
  });*/

  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      <form className="registerForm" >
                <input type="text"  placeholder='username' />
                <input type="text"  placeholder='Email' />
                <input  type='password' placeholder='Your password' />
                <button className="loginButton" type="submit">Register</button>
            </form>
    </div>
  )
}
