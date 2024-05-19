import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/AuthWithEmail.css';
import { setCredentials, userLoaded } from '../../../features/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../features/authApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../../../features/authSlice";
import { setUserId } from '../../../features/authSlice';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export default function AuthWithEmail() {
    const token = useSelector(selectCurrentToken);
    const userRef = useRef();
    const errRef = useRef();
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [usernameOrEmail, password]);

    const handleUserInput = (e) => setUsernameOrEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    const fetchAndSaveUserId = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/auth/get-user?username=${usernameOrEmail}`);
            const user = response.data;
            return user;
        } catch (error) {
            // Handle the error
            console.error('Error fetching user:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ usernameOrEmail, password }).unwrap();
            dispatch(setCredentials({ ...userData, usernameOrEmail }));

            //await fetchAndSaveUserId();
            const user = await fetchAndSaveUserId(); 
            dispatch(setUserId(user.id)); 

            setUsernameOrEmail("");
            setPassword("");
            navigate("/");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg("Missing username or password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    }

    const content = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className='login'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form className="loginForm" onSubmit={handleSubmit}>
                <span className='loginTitle'>Login</span>
                <input id='username' ref={userRef} type="text" placeholder='Email or Username' onChange={handleUserInput} value={usernameOrEmail} autoComplete='off' required />
                <input type='password' placeholder='Your password' onChange={handlePasswordInput} value={password} required />
                <button type="submit" className="loginButton">Login</button>
            </form>
        </div>
    );

    return content;
}
