import React, { useEffect } from 'react';
import './App.css';
import LandingPage from "./components/LandingPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './components/HomePage'
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login } from './features/userSlice';
import PrivateRoute from './helpers/PrivateRoute';

function App() {
  const dispatch = useDispatch()
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
      </Routes>
    </Router>
  );
}

export default App;
