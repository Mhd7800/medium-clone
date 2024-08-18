import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../features/userIdSlice';
import axios from 'axios';
import getUserInfoById from '../getUserInfo';
import { selectUser_id } from '../../features/authSlice';
import { Link } from 'react-router-dom';



const About = ({userInfo }) => {


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [followings, setFollowings] = useState([]);


  
  useEffect(() => {
    fetchFollowings();
}, [userInfo.username]);





  const fetchFollowings = async () =>{
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/following?userName=${userInfo.username}`);
      setFollowings(response.data);
      console.log('followings: ', response.data);
    }
    catch(error){
      console.log("Error fetching followers :", error)
    }
  }





  return (
    <div>
      
        <>
        
        <div className='DisplayAbout'>
          {loading && <div className="loading-indicator">Loading...</div>}
         {!userInfo.about && <p>User did not fill about</p>}
         <p>{userInfo.about}</p>
    
        </div>
        <div className="aboutFollowing" style={{margin:'20px 0'}}>
       
        {followings.length > 1 ? (
         <span style={{ color: 'green'}}>{followings.length } {' '}Followings
         </span>
        ):(
         <span style={{ color: 'green'}}>{followings.length} {' '}Following
         </span>
        )}
         
       </div>
       </>
        

    </div>
  );
};

export default About;











