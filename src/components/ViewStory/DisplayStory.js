import React, { useEffect, useState } from 'react'
import "./css/displayStory.css"
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from "react-redux"
import { selectUser } from '../../features/userSlice'
import { selectUserId } from '../../features/userIdSlice'
import getUserInfoById from "../getUserInfo";
import ReactHTMLparser from "react-html-parser";
import moment from 'moment';
import LandingHeader from '../LandingPage/LandingHeader'
import HomeHeader from '../HomePage/HomeHeader'
import Alert from '@mui/material/Alert';
import { selectUser_id } from '../../features/authSlice'
import { Avatar, Image, Spin, Tooltip, Popover,Button, message  } from 'antd'
import { CPopover, CButton } from '@coreui/react'
import Comments from './Comments'






const DisplayStory = () => {

  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const user_id =  useSelector(selectUser_id);
  const [loading, setLoading] = useState(false)
  const [singleB, setSingleB] = useState();
  const [userDetails, setUserDetails] = useState();
  const [authorInfo, setAuthorInfo] = useState();
  const [authorId, setAuthorId] = useState();
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [canfollowUsers, setCanFollowUsers] = useState([]);
  //const [isFollowing, setIsFollowing] = useState(false);


  const fetchCanFollow = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/can-follow?userName=${userDetails?.username}`);
      setCanFollowUsers(response.data);
    } catch (error) {
      console.log('Failed because of: ' + error);
    }
  };

  const canFollow = async (userId) => {
    for (const user of canfollowUsers) {
      if (userId === user.id) {
        return true;
      }
    }
    return false;
  }
  

  const handleFollow = async (authorId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/follow?followerId=${userId || user_id}&followingId=${authorId}`);
      if (response.status === 200) {
        message.info('Followed successfully');
        fetchCanFollow();
      }
    } catch (error) {
      console.error('Error following user:', error);
      message.error('Failed to follow user');
    }
  };
  
  const handleUnfollow = async (authorId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/unfollow?followerId=${userId || user_id}&followingId=${authorId}`);
      if (response.status === 200) {
        message.info('User unfollowed');
        fetchCanFollow();
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
      message.error('Failed to unfollow user');
    }
  };



  useEffect(()=>{
    fetchComments();
  }, [postId])
  
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/posts/${postId}/comments`);
      const commentsData = response.data; 
      setComments(commentsData);
      console.log('comments:', commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

 

  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  useEffect(()=>{
    getUserInfoById(authorId)
  .then((user)=>{
    setAuthorInfo(user);
  })
  },[authorId])

  useEffect(()=>{
    getUserInfoById(user_id || userId)
  .then((user)=>{
    setUserDetails(user);
  })
  },[user_id || userId])

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };


    const Content = ()=>{
      return (
        <div>
          <span style={{cursor:'pointer'}}>
            <Link to={`/updateStory/${singleB.id}`}>Edit Post</Link>
          </span><br></br>
          <span style={{cursor:'pointer', color:'red'}} onClick={() => handleDelete(singleB.id)}>Delete Post</span>

        </div>
      )
    }

      const Guest = () =>{
        return (
         <div className='guestClass'>
           {canFollow(singleB.user_id)? (
            <span className='guestOption' style={{cursor:'pointer'}} onClick={()=>handleFollow(singleB.user_id)}>
            <img width="25" height="25" src="https://img.icons8.com/fluency-systems-regular/20/add-user-male--v1.png" alt="add-user-male--v1"/>
             Follow author
           </span>
           ):
           (
            <span className='guestOption' style={{cursor:'pointer'}} onClick={()=>handleUnfollow(singleB.user_id)}>
            <img width="25" height="25" src="https://img.icons8.com/external-aficons-studio-basic-outline-aficons-studio/25/external-delete-user-user-interface-aficons-studio-basic-outline-aficons-studio.png" alt="external-delete-user-user-interface-aficons-studio-basic-outline-aficons-studio"/>
            Unfollow
            </span>
           )}
           
           
          {contextHolder}
          <span className='guestOption' onClick={handleCopyLink}>
          <img width="25" height="25" src="https://img.icons8.com/material-two-tone/20/link--v1.png" alt="link--v1"/>
            Copy Link
          </span>
         </div>
        )
      }

      const handleCopyLink = ()=>{
        navigator.clipboard.writeText(`localhost:3000/display/${singleB.id}`)
      .then(() => {
        messageApi.info('Link Copied!');
      })
      .catch((error) => {
        console.error('Error copying text: ', error);
      });
      }
  

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/posts/${postId}`);
      //window.location.reload(false);
    } catch (error) {
      console.error('Error deleting post:', error);
    } 
  };


    const addToList = async () => {
      try {
        await axios.post(`http://localhost:8080/api/v1/${userId || user_id}/addPostToList/${singleB.id}`);
        message.info('Story saved successfully');
        console.log('Post saved successfully');
      } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error saving post:', error);
      }
    };
    
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const decodedTitle = decodeURIComponent(encodedTitle);

        const response = await fetch(`http://localhost:8080/api/v1/posts/getPostById/${postId}`);
        const postData = await response.json();
        if (postData) {
          setSingleB(postData);
        }
        
        setSingleB(postData);
        setLoading(false);
        setAuthorId(postData.user_id);
        console.log("here is the data :"+ postData.title)
        console.log("here is the singleB :"+ singleB.title)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

 

  const HandleClap = async (postId, claps) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/posts/Clap/${postId}?claps=${claps}`, {
        claps: claps,
      });
      console.log(response.data);

      setSingleB(prevState => ({
        ...prevState,
        claps: prevState.claps + 1 // Assuming claps is a numeric value
      }));
  

      // Add animation class to clap button
      const clapButton = document.getElementById(`clap-button-${postId}`);
      clapButton.classList.add('clicked');

      // Remove animation class after animation completes
      clapButton.addEventListener('animationend', () => {
        clapButton.classList.remove('clicked');
      });
    } catch (error) {
      console.error(error);
    }
  };


const navigate = useNavigate();

  const handleClik = () =>{
    if (userId || user_id){
      addToList();
    }
    else {
      navigate("/sigin")
    }
  }  

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (

    <>
   
  <Spin spinning={loading}>

  <div className="singleBlog">

    {
      (userId || user_id) ? <LandingHeader/> : <HomeHeader/>
    }

            <h1
              className="singleBlog__title">
              {(singleB?.title)}
            </h1>

            
            {
                authorInfo && 
                
                (<div className='singleBlog_author'>
                  
                    <div className = 'singleBlog_left'>
                        <div className='author-details'>
                            <div>
                                <Avatar size={'large'} src = {authorInfo?.photoURL} />
                            </div>
                            <div className='author-name'>
                                <strong>
                                    {authorInfo?.name}
                                </strong>
                                <span>{singleB?.read_time} min read  * {singleB?.created_date} </span>
                            </div>
                        </div>
                    </div>

                    <div className='singleBlogHeader'>
                   
                    <div className='singleBlogHeaderLeft'>
                      <span id={`clap-button-${singleB.id}`} className="clap-button"  onClick={()=>HandleClap(singleB.id, singleB.claps)}>
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/applause.png" alt="applause"/>
                        {singleB.claps}
                      </span>

                     
                      <span onClick={togglePopover} style={{cursor:'pointer'}}>
                      <img width="20" height="20" src="https://img.icons8.com/ios/50/speech-bubble--v1.png" alt="speech-bubble--v1"/>
                      {isPopoverVisible && (
                          <div className="popover" onClick={(e) => e.stopPropagation()}>
                           <h2>Responses ({comments.length})</h2>
                            <Comments onCommentSubmit={handleCommentSubmit} comments={comments} userDetails={userDetails} togglePopover={togglePopover} postId={postId} fetchComments={fetchComments}/>
                          </div>)}
                          {comments.length}
                      </span>
                      </div>

                    <div className = 'singleBlogHeaderRight'>
                        <Tooltip title="Save">
                            <span style = {{
                                cursor: 'pointer'
                            }}
                            onClick={handleClik}>
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
                        
                        content={userId || user_id === singleB.user_id ? <Content /> : <Guest />}
                      placement="bottom"
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                      >
                         <span style = {{
                                cursor: 'pointer',
                            }}

                            >
                            <svg class="eh el py" width="25" height="25">
                            <path
                                d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z"
                                fillRule="evenodd"
                            ></path>
                            </svg>
                        </span>

                      </Popover>
                       
                    </div> 
                    </div>  
                    
                </div>
                )
            }
        <div className="singleBlog__body">
  
          {ReactHTMLparser(singleB?.content)}
         

          {/* <div dangerouslySetInnerHTML={{ __html: singleB?.content }} />*/}
          
        </div>
  </div>          
  </Spin>
  </>




  );
}

export default DisplayStory;
