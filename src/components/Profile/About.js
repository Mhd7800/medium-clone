import React, { useState, useEffect } from 'react';
import './css/About.css';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../features/userIdSlice';
import axios from 'axios';
import getUserInfoById from '../getUserInfo';
import { selectUser_id } from '../../features/authSlice';
import { Link } from 'react-router-dom';



const About = ({username, userInfo, setUserInfo }) => {


  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const connectedUser_Id = useSelector(selectUserId);
  //const user_id = useSelector(selectUser_id); // user logged in with jwt
  const [loading, setLoading] = useState(false);
  const [followings, setFollowings] = useState([]);


  
  useEffect(() => {
    fetchFollowings();
}, [username]);


  /*useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await getUserInfoById(connectedUser_Id)
        setUserInfo(user);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [userId]);*/


  const fetchFollowings = async () =>{
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/following?userName=${username}`);
      setFollowings(response.data);
      console.log('followings: ', response.data);
    }
    catch(error){
      console.log("Error fetching followers :", error)
    }
  }



  const handleEdit = () => {
    setEditing(true);
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*',
      // Add other necessary headers for authentication if needed
    },
  };
  


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Update about in the db
      if (!userInfo.about.trim()) {
        setError('Please provide valid information.');
        return;
      }
      await axios.put(`http://localhost:8080/api/v1/user/update/${userInfo.id}`, { about: userInfo.about }, config);
      setEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    }
  };

  const handleCancel = () => {
    setEditing(false); // Exit editing mode
  };


  const handleClearAbout = async () => {
    try {
      // Update about information in the db by sending an empty string
      await axios.put(`http://localhost:8080/api/v1/user/update/${userInfo.id}`, { about: '' }, config);
      setUserInfo({ ...userInfo, about: '' }); // Clear the about property
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    }
  };
  

  return (
    <div>
      {!editing && userInfo && userInfo.about && (
        <>
        
        <div className='DisplayAbout'>
          {loading && <div className="loading-indicator">Loading...</div>}
          <p>{userInfo.about}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleClearAbout}>Clear</button>
        </div>
        <div className="aboutFollowing" style={{margin:'20px 0'}}>
       
        {followings.length > 1 ? (
         <span style={{ color: 'green'}}>{followings.length} 
         <Link to={'followings'}> Followings</Link>
         </span>
        ):(
         <span style={{ color: 'green'}}>{followings.length} 
         <Link to={'followings'}> Following</Link>
         </span>
        )}
         
       </div>
       </>
        
      )}

      

      {!editing && (!userInfo.about) && (
        <div className="profileAbout">
          <div className="aboutWrapper">
      <div className="aboutContent">
        <h3>Tell the world about yourself</h3>
        <p>
          Here’s where you can share more about yourself: your history,
          work experience, accomplishments, interests, dreams, and more.
          You can even add images and use rich text to personalize your
          bio.
          {userInfo.about}
          {userInfo.name}
        </p>
        <button onClick={handleEdit}>Get Started</button>
        
      </div>
      <div className="about-line">
        <hr></hr>
      </div>
      <div className="aboutFollowing">
       
      {followings.length > 1 ? (
         <span style={{ color: 'green'}}>{followings.length} 
         <Link to={'followings'}> Followings</Link>
         </span>
        ):(
         <span style={{ color: 'green'}}>{followings.length} 
         <Link to={'followings'}> Following</Link>
         </span>
        )}
       
      </div>
      </div>
        </div>
      )}

      {editing && (
        <div className='editingForm'>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSave}>
            <textarea value={userInfo.about || ''} onChange={(e) => setUserInfo({ ...userInfo, about: e.target.value })} />
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default About;











