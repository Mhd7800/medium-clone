import React from 'react'
import { Avatar, Image, Popover } from 'antd'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import './css/ProfileInformation.css'
import { green } from '@mui/material/colors'
import { selectUserId } from '../../features/userIdSlice'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {storage} from "../../firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"


const ProfileInformation = () => {
    //const user = useSelector(selectUser);
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 
    const userId = useSelector(selectUserId);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    
    // update user info 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          setLoading(true);
          // Assuming you have an API endpoint to update user information
          await axios.put(`http://localhost:8080/api/v1/user/${userId}`, userInfo);
          
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
      }, [userId]);
    
     
    
      const getUserInfoById = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/user/${userId}`);
          const user = response.data;
          setUserInfo(user);
        } catch (error) {
          // Handle error
          throw error;
        }
      };

      const handleCancel = (e) => {
        e.preventDefault();
      };

      const handleImageChange = (e) =>{
         if(e.target.files[0]){
            setImage(e.target.files[0]);
         }
      }

      const handleSubmitImage = (e) =>{
        e.preventDefault();

        const imageRef = ref(storage, "image");
        uploadBytes(imageRef, image).then (()=>{
            getDownloadURL(imageRef).then((url)=>{
                setUrl(url);
            }).catch(error=>{
                console.log(error.message, "error getting the image")
            })
            setImage(null)
        })
      };

  return (
    <div className='ProfileInformation'>
        <div className='userInfo'>
            <div className='userPhoto'>
                <span>Photo</span>
            <Avatar 
                    size={65}
                    style={{cursor:"pointer"}}
                    src={
                        <Image
                          onClick={handleImageChange}
                          preview={false}
                          src={userInfo?.photoURL ?? 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=826'}
                        />
                      }
                ></Avatar>
            </div>
            <div className='photoInfo'>
                <div className='photoButtons'>
                    {/*<input type='file' onChange={handleImageChange}/>*/}
                    <span style={{color:"green"}} onClick={handleSubmitImage}>Update</span>
                    <span style={{color:"tomato"}}>Remove</span>
                </div>
                <div className='photoText'>
                    <span>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</span>
                    
                </div>
            </div>
        </div>

        <div className=''>
            <form className='userForm'>
            <label>Name*</label>
            <input value={userInfo?.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}></input>
            <span>Appears on your Profile page, as your byline, and in your responses.</span>
            <label>Bio</label>
            <input value={userInfo?.bio}
            onChange={(e)=> setUserInfo({...userInfo, bio: e.target.value})}
            ></input>
            <span>Appears on your Profile and next to your stories.</span>
            <div className='formButtons'>
            <button onClick={handleCancel} style={{color:"green", backgroundColor:"white", border:"0.85px solid"}}>Cancel</button>
            <button type='submit' style={{color:"white", backgroundColor:"green"}} disabled={loading} >
            {loading ? 'Saving...' : 'Save'}
            </button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default ProfileInformation