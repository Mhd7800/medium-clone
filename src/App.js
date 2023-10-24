import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from "./components/LandingPage/index";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomePage from './components/HomePage'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
//import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './helpers/PrivateRoute';
import Lists from "./components/Lists"
import OurStory from "./components/OurStory"
import Membership from "./components/Membership"
import Creators from "./components/Creators"
import { useNavigate } from 'react-router-dom';
import AuthWithEmail from './components/HomePage/Modal/AuthWithEmail';
import RegisterWithEmail from './components/HomePage/Modal/RegisterWithEmail';
import NoMatch from "./components/NoMatch"
import axios from 'axios';
import { selectCurrentToken, selectCurrentUser, setCredentials } from './features/authSlice';
import {store} from "./app/store"
import Profile from './components/Profile/Profile';

function App() {

  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState()
  const [isAuth, setIsAuth]= useState(false);

  
  const storedToken = localStorage.getItem('auth_Token');
  if (storedToken) {
  // Dispatch the setCredentials action with the stored token
    store.dispatch(setCredentials({ user: null, accessToken: storedToken }));
  }




  useEffect(()=>{
    auth.onAuthStateChanged(async(authUser)=>{
      if(authUser){
        console.log({authUser})
        localStorage.setItem("isAuth",true);
        dispatch(
          login({
          providerData: authUser.providerData[0],
        }));
      } 
    })
  }, [dispatch])


  return (
    <Router>
      <Routes>
        <Route path="*" element={<NoMatch />}/>

        <Route path="getting-started" element={<HomePage/>}/>

        <Route path="/" 
        element={<PrivateRoute>
          <LandingPage userDetails = {userDetails}/>
          </PrivateRoute>}
        />

      <Route path="/profile" 
        element={<PrivateRoute>
          <Profile/>
          </PrivateRoute>}
        />

        <Route
            path="/me/lists"
            element={
              <PrivateRoute>
                <Lists/>
              </PrivateRoute>
            }
          />
          
          <Route path='/register' element={<RegisterWithEmail/>}/>
          <Route path='/sigin' element={<AuthWithEmail/>}/>
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/membership" element={<Membership/>} />
          <Route path="/write" element={<Creators/>} />

      </Routes>
    </Router>
  );
}

export default App;
