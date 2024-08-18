import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from "./components/LandingPage/index";
import {BrowserRouter as Router,
  createBrowserRouter,
  createRoutesFromElements,
  Routes, Route, Navigate, RouterProvider,
  json} from "react-router-dom";
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
//import WriteStories from './components/WriteStories'
import Index from './components/WriteStories';
import Stats from './components/Stats/Stats';
import Settings from './components/Settings/Settings';
import { userId } from './features/userIdSlice';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import ViewStory from './components/ViewStory/ViewStory';
import DisplayStory, {DisplayStoryLoader} from './components/ViewStory/DisplayStory';
import ReadingList from './components/Profile/ReadingList';
import Followers from './components/Profile/Followers';
import Followings from './components/Profile/Followings'
import VisitorProfile from './components/VisitorProfile/VisitorProfile'


function App() {

  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState()
  
  useEffect(()=>{
    console.log('user :', user)
    console.log('token :', token)
  })
  
  /*useEffect(() => {
    const storedToken = localStorage.getItem('auth_Token');
    if (storedToken) {
      // Dispatch the setCredentials action with the stored token
      store.dispatch(setCredentials({ user: null, accessToken: storedToken }));
    }
  }, []);*/

  /*const persistedAuthUser = localStorage.getItem('authUser');
  useEffect(()=>{
    if (persistedAuthUser){
      const authUser = JSON.parse(persistedAuthUser);
      dispatch(login(authUser));
    }
  },[])*/

  


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
            username: authUser?.email.split('@')[0],
            
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

        } else if (response.status === 200) {
          // User already exists, do nothing
        }
  
       
        
        dispatch(
          login({
            providerData: authUser.providerData[0],
          }));
          localStorage.setItem('authUser', JSON.stringify(authUser.providerData[0]))
          //console.log(authUser.providerData[0].photoURL)
          //console.log(authUser.uid) //string
          
          //******get the user id ****/
          try {
            //const response = await axios.get(`http://localhost:8080/api/v1/auth/get-user?email=${authUser.email}`, {
            const response = await axios.get(`http://localhost:8080/api/v1/user/email/${authUser.email}`, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.status === 200) {
              // User found, update userDetails state
              //console.log('access token '+authUser.accessToken)
              //console.log('refresh token '+authUser.refreshToken)
              console.log('google auth userId: '+response.data.id);
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
  

  // if loggedIn= true display this else display something else.

  return (
    
    <Router>
      <Routes>
        <Route path="*" element={<NoMatch />}/>

        <Route path="getting-started" element={<HomePage/>}/>

        <Route path="/" 
        element={<PrivateRoute>
          <LandingPage/>
          </PrivateRoute>}
        />


      <Route path="/updateStory/:postId" element={<ViewStory />} />
      
      
      <Route path='/display/:postId' 
      element={<DisplayStory/>}
      />
      

      <Route path="/profile" 
        element={<PrivateRoute>
          <Profile/>
          </PrivateRoute>}
        />

    <Route path="profile/followers" 
        element={<PrivateRoute>
          <Followers/>
          </PrivateRoute>}
        />
    
    <Route path="profile/followings" 
        element={<PrivateRoute>
          <Followings/>
          </PrivateRoute>}
        />

        <Route
            path="/lists"
            element={
              <PrivateRoute>
                <Lists/>
              </PrivateRoute>
            }
          />


          <Route
            path="profile/me/readinglist"
            element={
              <PrivateRoute>
                <ReadingList/>
              </PrivateRoute>
            }
          />

        <Route
            path="/stories"
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
                <Index/>
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
          <Route path='/:username' element={<VisitorProfile />}/>

      </Routes>
    </Router>
  );
}

export default App;
