import React, { useEffect } from 'react'
import LandingHeader from '../LandingPage/LandingHeader'
import { Avatar, Image, Popover } from 'antd'
import Footer from '../footer/Footer'
import "./css/profile.css"
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import ListItem from './ListItem'
import { useState } from 'react'
import About from './About'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ProfileInformation from './ProfileInformation'
import { selectUserId } from '../../features/userIdSlice'
import axios from 'axios'
import Home from './Home'
import { selectUser_id } from '../../features/authSlice'
import { Link, useParams } from 'react-router-dom'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
  };




const Profile = () => {

const [userInfo, setUserInfo] = useState({});
const userId = useSelector(selectUserId);
const user_id = useSelector(selectUser_id);
const user = useSelector(selectUser);
const [open, setOpen] = React.useState(false);
const [close, setClose] = React.useState(false);
const [posts, setPosts] = useState([]);
const [followers, setFollowers] = useState([]);
const [acik, setAcik] = useState('false');
const [kapali, setKapali] = useState('false');


const handleModal = () => {
  setAcik((prevAcik)=> !prevAcik);
}


useEffect (()=>{
  getUserInfoById()
},[userId || user_id])


  const getUserInfoById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/${userId || user_id}`);
      const user = response.data;
      setUserInfo(user);
    } catch (error) {
      throw error;
    }
  };




 useEffect(()=>{
  const fetchFollowers = async () =>{
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/followers?userName=${userInfo?.username}`);
      setFollowers(response.data);
      console.log('followers: ', response.data);
    }
    catch(error){
      console.log("Error fetching followers :", error)
    }
  }
  fetchFollowers();
 },[userInfo.username]) 



useEffect(() => {
  const fetchPosts = async () => {
    try {
      // Update the URL to match your API endpoint
      const response = await axios.get(`http://localhost:8080/api/v1/posts/getPostByUserId/${userId || user_id}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Handle the error according to your application's needs
    }
  };

  fetchPosts();
}, [userId]);


const handleClose = () => {
  setOpen(false)
  setClose(true)
};

const handleOpen = async () => {
  setOpen(true);
};

const handleCancel = () => {
  setOpen(false);
};

const handleSaveProfile = async () => {
  // Close the modal
  setOpen(false);
  // Fetch and update user information
  await getUserInfoById();
};

const handleCopyLink = () => {
  navigator.clipboard.writeText("profile link"); 
  alert("Profile link copied!");
};



  return (
    <div className='profilePage'>
        <div className='profileHeader'>
            <LandingHeader onSave={handleSaveProfile}/>
        </div>

    <div className='profileContainer'>
        <div className='profileLeftContent'>
            
            <div className='profileTabElement'>
            <div className='profileName'>
                <span>{userInfo.name}</span>
                <span onClick={handleCopyLink}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>
                </span>
            </div>

                <Tabs>
                    <TabList>
                    <Tab>Home</Tab>
                    <Tab>List</Tab>
                    <Tab>About</Tab>
                    </TabList>

                    <TabPanel>
                    {posts.map(post=>(
                          <Home post={post} 
                          userInfo={userInfo}
                          />
                        ))
                     } 
                    </TabPanel>
                    <TabPanel>
                    <ListItem />
                    </TabPanel>
                    <TabPanel>
                    <About  
                     userInfo={userInfo}
                     setUserInfo ={setUserInfo}
                     />
                    </TabPanel>
                </Tabs>


            </div>
            </div>
            <div className='line'>
                <hr></hr>
            </div>
        <div className='profileRigthContent'>
            <div className='profileRightUpper'>
            <Avatar 
                    size={75}
                    style={{cursor:"pointer"}}
                    src={
                        <Image
                          preview={false}
                          src={userInfo.photoURL ?? 'https://img.icons8.com/material-outlined/24/user--v1.png'}
                        />
                        
                      }
                ></Avatar>
            <h3>{userInfo.name}</h3>
           <div>
           {followers.length > 1 ? (
                <p style={{cursor:'pointer'}}>{followers.length} 
                <Link to={'followers'}> Followers</Link>
                
                </p>
            ) : (
                <p  style={{cursor:'pointer'}}>{followers.length} 
                  <Link to={'followers'}> Follower</Link>
                </p>
            )}
           </div>
            <p>{userInfo.bio}</p>
             <span onClick={handleOpen}>Edit profile</span>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Profile Information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <ProfileInformation onSave={handleSaveProfile} onCancel={handleCancel}/>
          </Typography>
        </Box>
      </Modal>
            </div>
            <div className='proileFooter'>
            
            </div>
            
        </div>

        
        
    </div>
    <Footer/>
    </div>
  )
}

export default Profile