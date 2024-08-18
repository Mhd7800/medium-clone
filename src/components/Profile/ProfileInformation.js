import React, { useState, useEffect } from 'react';
import { Avatar, Image, Upload, message, Popover } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './css/ProfileInformation.css';
import { selectUserId } from '../../features/userIdSlice';
import axios from 'axios';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { selectUser_id } from '../../features/authSlice';

const ProfileInformation = ({onSave, onCancel}) => {

  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(selectUserId);
  const user_id =  useSelector(selectUser_id);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const deleteImage = async(image) => {
    try {
      console.log(image)
      const deleteRef = ref(this.storage, image.image);
      await deleteObject(deleteRef)
      
    }
    catch(error){
      
    }
  }



  const removeProfilePicture = async () => {
    try {
      setLoading(true);
      
      userInfo.photoURL = null;
      
      // Clear the photoURL in user information
      await axios.put(`http://localhost:8080/api/v1/user/${userId || user_id}`, {
        ...userInfo,
        //photoURL: null
      });
  
      // Clear the URL state
      setUrl(null);
  
      // Fetch updated user information
      //await getUserInfoById();

    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      setLoading(true);

      const imageRef = ref(storage, `images/${userId || user_id}/${file.name}`);
      await uploadBytes(imageRef, file);

      const imageUrl = await getDownloadURL(imageRef);

      await axios.put(`http://localhost:8080/api/v1/user/${userId || user_id}`, {
        ...userInfo,
        photoURL: imageUrl,
      });
      setUrl(imageUrl);
      onSuccess();
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedUserInfo = {
        ...userInfo,
        photoURL: url !== null ? url : userInfo.photoURL,
      };

      await axios.put(`http://localhost:8080/api/v1/user/${userId || user_id}`, updatedUserInfo);
      onSave();
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserInfoById();
      } catch (error) {
        setError(error.message || 'An error occurred');
      }
    };

    fetchData();
  }, [userId || user_id]);

  const getUserInfoById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/${userId || user_id}`);
      const user = response.data;
      setUserInfo(user);
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    onCancel();
  };


  return (
    <div className="ProfileInformation">
      <div className="userInfo">
        <div className="userPhoto">
          <span>Photo</span>
          <Avatar
            size={65}
            style={{ cursor: 'pointer' }}
            src={
              <Image
                preview={false}
                src={userInfo.photoURL ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
              />
            }            
          ></Avatar>
        </div>
        <div className="photoInfo">
          <div className="photoButtons">
            <Upload
              customRequest={customRequest}
              showUploadList={false}
              onChange={handleImageChange}
              accept="image/*"
            >
              <span style={{ color: 'green', cursor: 'pointer' }}>Update</span>
            </Upload>
            <span style={{ color: 'tomato' }}onClick={removeProfilePicture}>
              Remove</span>
          </div>
          <div className="photoText">
            <span>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</span>
          </div>
        </div>
      </div>

      <div className="">
        <form className="userForm">
          <label>Name*</label>
          <input
            value={userInfo?.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          ></input>
          <span>Appears on your Profile page, as your byline, and in your responses.</span>
          <label>Bio</label>
          <input
            value={userInfo?.bio}
            onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
          ></input>
          <span>Appears on your Profile and next to your stories.</span>
          <div className="formButtons">
            <button onClick={handleCancel} style={{ color: 'green', backgroundColor: 'white', border: '0.85px solid' }}>
              Cancel
            </button>
            <button type="submit" style={{ color: 'white', backgroundColor: 'green' }} disabled={loading} onClick={handleSubmit}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInformation;
