import React, { useState, useEffect } from 'react';
import './css/About.css';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../features/userIdSlice';
import axios from 'axios';


const About = () => {

  const [userInfo, setUserInfo] = useState({});
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const userId = useSelector(selectUserId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getUserInfoById();
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [userId]);

 

  const getUserInfoById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/${userId}`);
      const user = response.data;
      setUserInfo(user);
    } catch (error) {
      //console.error('Error fetching user by ID:', error);
      // Handle error
      throw error;
    }
  };

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
      await axios.put(`http://localhost:8080/api/v1/user/update/${userId}`, { about: userInfo.about }, config);
      setEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    }
  };

  const handleCancel = () => {
    setEditing(false); // Exit editing mode
  };


  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // Update about in the db
      if (!userInfo.about.trim()) {
        setError('Please provide valid information.');
        return;
      }
      await axios.put(`http://localhost:8080/api/v1/user/update/${userId}`, { about: '' }, config);
      setEditing(false); // Exit editing mode
      setUserInfo({ ...userInfo, about: '' });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <div>
      {!editing && userInfo && userInfo.about && (
        <div className='DisplayAbout'>
          {loading && <div className="loading-indicator">Loading...</div>}
          <p>{userInfo.about}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Clear</button>
        </div>
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
        </p>
        <button onClick={handleEdit}>Get Started</button>
        
      </div>
      <div className="about-line">
        <hr></hr>
      </div>
      <div className="aboutFollowing">
        <span style={{ color: 'green' }}>1 Following</span>
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











