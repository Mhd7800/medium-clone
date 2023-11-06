import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './css/AuthWithEmail.css'
import { setCredentials, userLoaded } from '../../../features/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../features/authApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../../../features/authSlice";

export default function AuthWithEmail() {

    const token = useSelector(selectCurrentToken);

    const userRef = useRef()
    const errRef = useRef()
    const [usernameOrEmail, SetUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState();
    const navigate = useNavigate()    

    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrMsg("")
    },[usernameOrEmail, password])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const userData = await login({usernameOrEmail, password}).unwrap()
            dispatch(setCredentials({...userData, usernameOrEmail}))
            //get user with email 
            // set user id in the redux state
            localStorage.setItem("isAuth",true);
            SetUsernameOrEmail("")
            setPassword("")
            navigate("/")
        }catch (err){
            if(!err?.response){
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 400)
            {
                setErrMsg("Missing username or password")
            }
            else if (err.response?.status === 401)
            {
                setErrMsg("Unauthorized")
            }
            else
            {
                setErrMsg("Login Failed")
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => SetUsernameOrEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    
    const content = isLoading ? <h1>Loading...</h1> : 
   (
    <div className='login'>

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <form className="loginForm" onSubmit={handleSubmit} >
                <span className='loginTitle'>Login</span>
                <input  id='username' ref={userRef} type="text"  placeholder='Email or Username' onChange={handleUserInput} value={usernameOrEmail} autoComplete='off' required/>
                <input  type='password' placeholder='Your password' onChange={handlePasswordInput} value={password} required/>
                
                {/* loading ? <div className="loading"><span>Loading...</span></div> : <button type="submit" className="loginButton" name="Login"> Login</button>*/}

                <button type="submit" className="loginButton">Login</button>
                
            </form>
        </div>
  )

  return content
}
