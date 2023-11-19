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
import Stories from './components/Stories/';
import WriteStories from './components/WriteStories'
import Stats from './components/Stats/Stats';
import Settings from './components/Settings/Settings';
import { userId } from './features/userIdSlice';

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


  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const response = await axios.post('http://localhost:8080/api/v1/auth/check-user', {
          email: authUser.email,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
          if (response.status === 204) {
           await axios.post('http://localhost:8080/api/v1/auth/registerWithGoogle', {
            email: authUser?.email,
            name: authUser?.displayName,
            //id: authUser.providerData[0].uui,  //the id provided by firestore is a string        
            photourl: authUser.providerData[0].photoURL,
            
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

        } else if (response.status === 200) {
          // User already exists, do nothing
        }
  
        localStorage.setItem("isAuth", true);
        dispatch(
          login({
            providerData: authUser.providerData[0],
          }));
          //console.log(authUser.providerData[0].photoURL)
          console.log(authUser)
          //console.log(authUser.uid) //string
          

          //******get the user id ****/
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/auth/get-user?email=${authUser.email}`, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.status === 200) {
              // User found, update userDetails state
              console.log(response.data.id);
              dispatch(userId(response.data.id))
            } else if (response.status === 404) {
              // User not found, handle accordingly
            }
            /************************************** */
           
            dispatch(
              login({
                providerData: authUser.providerData[0],
              }));
          } catch (error) {
            // Handle error (e.g., network error, server error)
            console.error('Error fetching user details:', error);
          }
      }
    });
  }, [dispatch]);
  


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

        <Route
            path="/me/stories"
            element={
              <PrivateRoute>
                <Stories/>
              </PrivateRoute>
            }
          />
          <Route
            path="/new-story"
            element={
              <PrivateRoute>
                <WriteStories/>
              </PrivateRoute>
            }
          />
          <Route
            path="/me/stats"
            element={
              <PrivateRoute>
                <Stats/>
              </PrivateRoute>
            }
          />
          <Route
            path="/me/settings"
            element={
              <PrivateRoute>
                <Settings/>
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
