import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from "./components/LandingPage/index";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomePage from './components/HomePage'
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login } from './features/userSlice';
import PrivateRoute from './helpers/PrivateRoute';
import Lists from "./components/Lists"
import OurStory from "./components/OurStory"
import Membership from "./components/Membership"


function App() {
  const dispatch = useDispatch()
  //const [userDetails, setUserDetails] = useState()
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log({authUser})
        dispatch(login({
          providerData: authUser.providerData[0]
        }))
      }
    })
  }, [dispatch])
  return (
    <Router>
      <Routes>
        <Route 
        path="getting-started" element={<HomePage/>}
        />
        <Route 
        path="/" element={<PrivateRoute><LandingPage/></PrivateRoute>}
        />
        {/*<Route
            path="/me/lists"
            element={
              <PrivateRoute>
                <Lists userDetails = {userDetails} />
              </PrivateRoute>
            }
          />*/}
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/membership" element={<Membership/>} />
      </Routes>
    </Router>
  );
}

export default App;
