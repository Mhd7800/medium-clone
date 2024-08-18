import React, {useEffect} from 'react'
import LandingHeader from '../LandingPage/LandingHeader'
import { Avatar, Image, Popover } from 'antd'
import Footer from '../footer/Footer'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { useState } from 'react'
import 'react-tabs/style/react-tabs.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ProfileInformation from './ProfileInformation'
import { selectUserId } from '../../features/userIdSlice'
import axios from 'axios'
import reactHtmlParser from "react-html-parser";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { selectUser_id } from '../../features/authSlice'



const ReadingList = () => {


    const [userInfo, setUserInfo] = useState({});
    const userId = useSelector(selectUserId);
    const user_id = useSelector(selectUser_id);
    const user = useSelector(selectUser);
    const [open, setOpen] = React.useState(false);
    const [close, setClose] = React.useState(false);
    const [currentDate, setCurrentDate] = useState(getDate());
    const [isDeleting, setIsDeleting] = useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});

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

    useEffect(() => {
      fetchPosts();
  }, []);

   


   const fetchPosts = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/getUserList/${userId || user_id}`);
        if (response.ok) {
            const data = await response.json();
            setPosts(data);
            // Fetch user details for each post
            data.forEach(post => fetchUser(post.user_id));
        } else {
            console.error('Failed to fetch posts');
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};


const fetchUser = async (userId) => {
  console.log('Fetching user:', userId);
  try {
      const response = await fetch(`http://localhost:8080/api/v1/user/${userId}`);
      if (response.ok) {
          const user = await response.json();
          //console.log('Fetched user:', user);
          setUsers(prevUsers => ({
              ...prevUsers,
              [userId]: user
          }));
          console.log('Updated users:', users);
      } else {
          console.error('Failed to fetch user:', userId);
      }
  } catch (error) {
      console.error('Error fetching user:', error);
  }
};
      


    const removefromList = async (postId) => {
        try {
          // Send a POST request to your backend endpoint to save the post
          await axios.delete(`http://localhost:8080/api/v1/${postId}/removeFromUserList/${userInfo.id}`);

          // Remove the deleted post from the posts state
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

          setIsDeleting(false)
        } catch (error) {
          // Handle any errors that occur during the request
          console.error('Error saving post:', error);
        }
      }

      const getFirstSentence = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const textContent = doc.body.textContent || ""; // Extract text content, ignoring HTML tags

        const sentences = textContent.split('.');
        if (sentences.length > 0) {
            return sentences[0].trim() + '.';
        }
        return textContent;
      };

    function getDate() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const today = new Date();
        const month = months[today.getMonth()];
        const day = today.getDate();
        const year = today.getFullYear();
        return `${month} ${day}, ${year}`;
      }

    const getUserInfoById = async () => {
        try {
          const response =  await axios.get(`http://localhost:8080/api/v1/user/${userId || user_id}`);
          const user = response.data;
          setUserInfo(user);
        } catch (error) {
          throw error;
        }
      };


    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
      };   

    
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
     getUserInfoById();
  };
  

useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/${userId || user_id}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  fetchUserInfo();
}, [userId || user_id]);




  return (
    
    <div className='profilePage'>
        <div className='profileHeader'>
            <LandingHeader onSave={handleSaveProfile}/>
        </div>

    <div className='profileContainer'>
        <div className='profileLeftContent'>
            
            <div className='profileTabElement'>

            <div className='profileLeftItem'>
                <div className='profileLeftItemInfo'>
                <Avatar 
                    size={50}
                    style={{cursor:"pointer"}}
                    src={
                        <Image
                          preview={false}
                          src={userInfo?.photoURL ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                        />
                      }
                ></Avatar>
                <span>{userInfo?.name}</span>
                </div>

                <div className='profileleftItemBottomm' style={{display:'flex', flexDirection:'row', alignContent:'center', alignItems:'center', marginLeft:'50px', fontSize:'16px'}}>
                <p style={{margin: '0 10px'}}>{currentDate}</p>
                ·   
                <span style={{margin: '0 10px'}}> {posts.length} stories</span>
                <span >🔒</span>
                </div>
                </div>


            </div>

            <div className='readingListContent'  style={{margin:'20px'}}>
            <h1>Reading list</h1>
            
           {
            posts.map((post)=>(
                <div className={`userposts ${isDeleting ? 'fade-out' : ''}`}
                key={post.id}>
                 <div className='HomeUserInfo'>
                   <Avatar
                   size={25}
                   //{users[post.user_id] && <img src={} alt="User"/>}
                   src={users[post.user_id]?.photoURL}
                   >
                   </Avatar>
                   <span>{users[post.user_id]?.name}</span>
                 </div>
                 
                 <div className='homeContent-Info'>
                 
                 <Link to={`/display/${post.id}`}>
                 <h3>{reactHtmlParser(post?.title)}</h3>
               </Link>
   
                   
                 <p className='postContent'>{getFirstSentence(post.content)}</p>
                 </div>
   
                 <div className='homeUserPostBottom'>
                 <p className='postReadTime'>{post.read_time} min read time ·</p>
                 <p className='createdDate'>{post.created_date}</p>  
                 </div>
                 
                 <div className='homeUserBottom'>
                <span style={{cursor:'pointer'}} onClick={()=>removefromList(post.id)}>
                <img width="35" height="35" src="https://img.icons8.com/fluency-systems-filled/48/delete-forever.png" alt="delete-forever"/>
                </span>
              
   
                 </div>
                 {/* Render other post details as needed */}
               </div>
              )
                
            )
           }

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
                          src={userInfo?.photoURL ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                        />
                      }
                ></Avatar>
            <h3>{userInfo?.name}</h3>
            <p>{userInfo?.bio}</p>
        
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

export default ReadingList
