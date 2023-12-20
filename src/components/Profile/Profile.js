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


  const getUserInfoById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/${userId}`);
      const user = response.data;
      setUserInfo(user);
    } catch (error) {
      throw error;
    }
  };

const [userInfo, setUserInfo] = useState({});
const userId = useSelector(selectUserId);
const user = useSelector(selectUser);
const [open, setOpen] = React.useState(false);
const [close, setClose] = React.useState(false);


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

console.log(userInfo)

useEffect (()=>{
  getUserInfoById();
},[userId])

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
                <p>...</p>
            </div>

                <Tabs>
                    <TabList>
                    <Tab>Home</Tab>
                    <Tab>About</Tab>
                    </TabList>

                    <TabPanel>
                    <ListItem/>
                    </TabPanel>
                    <TabPanel>
                    <About />
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
                          src={userInfo.photoURL ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                        />
                      }
                ></Avatar>
            <h3>{userInfo.name}</h3>
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
            <Footer/>
            </div>
            
        </div>

        
        
    </div>
    </div>
  )
}

export default Profile