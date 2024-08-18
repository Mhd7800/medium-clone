import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProfileInformation from './ProfileInformation';
import Footer from '../footer/Footer';
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { selectUser_id } from '../../features/authSlice'
import { selectUserId } from '../../features/userIdSlice'
import { Breadcrumb } from 'antd';
import { Avatar, Image, Upload, message, Popover } from 'antd';
import LandingHeader from '../LandingPage/LandingHeader';
import getUserInfoById from '../getUserInfo';
import "./css/Followers.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const Followers = () => {

    
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
    
    const [userInfo, setUserInfo] = useState({});
    const userId = useSelector(selectUserId);
    const user_id = useSelector(selectUser_id);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [close, setClose] = React.useState(false);
    const navigate = useNavigate();

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



    useEffect(()=>{
        const getUserInfoById = async () => {
            try {
              const response = await axios.get(`http://localhost:8080/api/v1/user/${userId || user_id}`);
              const user = response.data;
              setUserInfo(user);
            } catch (error) {
              throw error;
            }
          };
          getUserInfoById();

    },[userId || user_id])


   
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

  
        const fetchFollowers = async () =>{
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/followers?userName=${userInfo.username}`);
            setFollowers(response.data);
            console.log('followers: ', response.data);
          }
          catch(error){
            console.log("Error fetching followers :", error)
          }
        }
       

       useEffect(() => {
        fetchFollowers();
        fetchFollowings();
    }, [userInfo.username]);


       const isFollowing = (follower) => {
        return followings.some((following) => following.username === follower.username);
    };


    const handleFollow = async (follower) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/follow?followerId=${userInfo.id}&followingId=${follower}`)

            if (response.status === 200) {
                message.success('Followed successfully ');
                // Refresh followers list after following
                fetchFollowers();
                fetchFollowings();
            }
        } catch (error) {
            console.log('Error following user:', error);
            message.error('Failed to follow user');
        }

    }; 

    const handleUnfollow = async (followingId) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/unfollow?followerId=${userInfo.id}&followingId=${followingId}`);
            if (response.status === 200) {
                message.success('Unfollowed successfully');
                fetchFollowings();
                fetchFollowers();
            }
        } catch (error) {
            console.log('Error unfollowing user:', error);
            message.error('Failed to unfollow user');
        }
    };

  return (
    <>
    <LandingHeader/>
    <div className='userFollowers'>

   <div className='userFollowersLeft'>

   <div className='userFollowersLeftUppper'>
   <div className='bredcrumbUserFollower'>
   <Breadcrumb
  separator=">"
  items={[
    {
      title: <span onClick={() => navigate(-1)}>Profile</span>,
    },
    {
      title: 'Followers',
    },
  ]}
/>
   </div>

   <div className='followersTitle'>
        <h1>{followers.length} Followers</h1>
    </div>
   </div>

   {
    followers.map(user=>(
        <div className='followerContent'>
        <div className='followerLeft'>
        <Avatar
            size={40}
            style={{ cursor: 'pointer' }}
            src={
              <Image
                preview={false}
                src={user.photoURL ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
              />
            }            
          ></Avatar>
        </div>

        <div className='followerMiddle'>
            <span>{user.name}</span>
            <p>{user.bio}</p>
        </div>

        <div className="followersRight">
            {isFollowing(user) ? (
                <button className="bt1" onClick={() => handleUnfollow(user.id)}>Following</button>
            ) : (
                <button className="bt2" onClick={() => handleFollow(user.id)}>Follow</button>
            )}
        </div>
    </div>
    ))
   }

    

   </div>

   {/*<div className='userFollowersRight'>
   </div>*/}
   <div className='line'>
                <hr></hr>
            </div>
            
   <div className='userFollowersRight'>
            <div className='userFollowerRightUpper'>
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
    </>
  )
}

export default Followers
