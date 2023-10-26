import React from 'react'
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


const user = useSelector(selectUser);
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


  return (
    <div className='profilePage'>
        <div className='profileHeader'>
            <LandingHeader/>
        </div>

    <div className='profileContainer'>
        <div className='profileLeftContent'>
            
            <div className='profileTabElement'>
            <div className='profileName'>
                <span>{user?.providerData?.displayName}</span>
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
                          src={user?.providerData?.photoURL ?? 'http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3'}
                        />
                      }
                ></Avatar>
            <h3>{user?.providerData?.displayName}</h3>
            <p>about me</p>
        
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
        <ProfileInformation/>
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