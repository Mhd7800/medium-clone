import React , {useEffect, useState} from 'react'
import { Avatar, Button, Image, Popover } from 'antd'
import { Tooltip } from "antd";
import { truncate } from './WhoToFollow'
import moment from "moment";
import "./css/LandingRecommendedPost.css"
import reactHtmlParser from "react-html-parser";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import getUserInfoById from '../getUserInfo';
import { colors } from '@mui/material';
import { light } from '@mui/material/styles/createPalette';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectUserId } from '../../features/userIdSlice';
import { selectUser_id } from '../../features/authSlice';
import Alert from '@mui/material/Alert';
import { message } from 'antd';



export default function LandingRecommendedPost ({ story,canfollowUsers, handleFollow, handleUnfollow }) {


  const user = useSelector(selectUser);
  const Id = useSelector(selectUserId);
  const user_id = useSelector(selectUser_id);
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState();
  const userId = story?.user_id;
  const [open, setOpen] = useState(false);
  const [followings, setFollowings] = useState([]);
  const [authorInfo, setAuthorInfo] = useState();

  //const {isFollowing} = story;
  

  useEffect(()=>{
    getUserInfoById(userId)
  .then((user)=>{
    setUserInfo(user);
  })
  
  },[userId])

  useEffect(()=>{
    getUserInfoById(Id || user_id)
  .then((user)=>{
    setAuthorInfo(user);
  })
  },[Id || user_id])




const isFollowing = (author_id) => {
  return canfollowUsers.some(element => element.id === author_id);
};


  
  useEffect(()=>{
    fetchFollowings();
  },[])

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };


  const fetchFollowings = async () => {
    try {
      if (userInfo) {
        const response = await axios.get(`http://localhost:8080/api/v1/following?userName=${authorInfo.username}`);
        setFollowings(response.data);
        console.log('followings: ', response.data);
      }
    } catch(error) {
      console.log("Error fetching followers :", error);
    }
  }
  

  const addToList = async() => {
    try {
      
      await axios.post(`http://localhost:8080/api/v1/${Id || user_id}/addPostToList/${story.id}`);
      message.info("Post saved successfully")
      console.log('Post saved successfully');
    } catch (error) {
      message.error('Failed to follow user')
      console.error('Error saving post:', error);
    }
  }

//   const handleFollow = async (follower) => {
//     try {
//         const response = await axios.post(`http://localhost:8080/api/v1/follow?followerId=${Id || user_id}&followingId=${follower}`)

//         if (response.status === 200) {
//             message.info('Followed successfully');
//             fetchFollowings();
//             //fetchFollowingPosts();
//         }
//     } catch (error) {
//         console.log('Error following user:', error);
//         message.error('Failed to follow user');
//     }
// }; 

// const handleUnfollow = async (follower) => {
//   try {
//       const response = await axios.post(`http://localhost:8080/api/v1/unfollow?followerId=${Id || user_id}&followingId=${follower}`);
//       if (response.status === 200) {
//           message.warning('Unfollowed successfully');
//           fetchFollowings();
//           //fetchFollowingPosts();
//       }
//   } catch (error) {
//       console.log('Error unfollowing user:', error);
//       message.error('Failed to unfollow user');
//   }
// };

  const styles = {
    color: '#999',
    fontWeight: 400
  }

  const contentStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: 16,
    fontWeight: 400
  };

  return (
    <div className="landing-recommended-post">
      <div className="landing-recommended-post-container">
      <div className="landing-recommended-left">
        <div className="landing-top">
        {userInfo && (
              <>
                <img src={userInfo.photoURL} alt="logo"/>
                <span>{userInfo.name} {`  `}</span> 
                <span style={styles}>  ·  {story?.created_date}</span>
              </>
            )}
        </div>
        <div className="landing-content">
          <Link to = {`/display/${story.id}`}>{reactHtmlParser(story?.title)}</Link>
        
          <div style={contentStyle}>
            {reactHtmlParser(story?.content)}
          </div>
        </div>
        <div className="landing-footer">
          <span>
          {story?.topic} . {story?.read_time} min read 
          {/*!isFollowing(story.user_id)?(<p>following</p>):(<p>not following</p>)*/}
          </span>
          <div className="icons">
          <ToastContainer />
            <Tooltip title="Save">
              <span onClick={() => addToList(story?.id)}>
                
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  class="px"
                >
                  <path
                    d="M18 2.5a.5.5 0 0 1 1 0V5h2.5a.5.5 0 0 1 0 1H19v2.5a.5.5 0 1 1-1 0V6h-2.5a.5.5 0 0 1 0-1H18V2.5zM7 7a1 1 0 0 1 1-1h3.5a.5.5 0 0 0 0-1H8a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V7z"
                    fill="#292929"
                  ></path>
                </svg>
              </span>
              
            </Tooltip>
            <Popover 
            content={
              !isFollowing(story.user_id) ? (
                <span style={{ cursor: 'pointer' }} onClick={() => handleUnfollow(story.user_id)}>Unfollow author</span>
              ) : (
                <span style={{ cursor: 'pointer' }} onClick={() => handleFollow(story.user_id)}>Follow author</span>
              )
            }

            placement="bottom"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            >
              <Button type='text'>
              <svg class="eh el py" width="25" height="25">
                <path
                  d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z"
                  fillRule="evenodd"
                ></path>
              </svg>
              </Button>
            
            </Popover>
           
          </div>
        </div>
      </div>
        <div className="landing-recommended-right">
          {/*author : {userDetails?.name}
          <h3>{story?.title}</h3>*/}
        </div>
      </div>
    </div>
  );
}


