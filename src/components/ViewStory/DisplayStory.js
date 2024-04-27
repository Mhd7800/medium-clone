import React, { useEffect, useState } from 'react'
import "./css/displayStory.css"
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from "react-redux"
import { selectUser } from '../../features/userSlice'
import { selectUserId } from '../../features/userIdSlice'
import { Avatar, Spin, Tooltip, Popover } from 'antd';
import getUserInfoById from "../getUserInfo";
import ReactHTMLparser from "react-html-parser";
import moment from 'moment';
import LandingHeader from '../LandingPage/LandingHeader'
import HomeHeader from '../HomePage/HomeHeader'
import Alert from '@mui/material/Alert';
import { Button, message } from 'antd';
import { selectUser_id } from '../../features/authSlice'





const DisplayStory = () => {

  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId) || useSelector(selectUser_id);
  const [loading, setLoading] = useState(false)
  const [singleB, setSingleB] = useState();
  const [userDetails, setUserDetails] = useState();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [authorInfo, setAuthorInfo] = useState();
  const [authorId, setAuthorId] = useState();
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();



  useEffect(()=>{
    getUserInfoById(authorId)
  .then((user)=>{
    setAuthorInfo(user);
  })
  },[authorId])

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
           <span className='guestOption'>
           <img width="25" height="25" src="https://img.icons8.com/fluency-systems-regular/20/add-user-male--v1.png" alt="add-user-male--v1"/>
            Follow author
          </span>
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
        await axios.post(`http://localhost:8080/api/v1/${userId}/addPostToList/${singleB.id}`);
        setSuccessMessageVisible(true); 
        setTimeout(() => {
          setSuccessMessageVisible(false); // Hide the success message after 1 second
        }, 1000);
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
        setPostData(postData);
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
    if (localStorage.getItem("isLoggedIn")===true){
      addToList();
    }
    else {
      navigate("/sigin")
    }
  }

  

  return (

    <>
    {
      localStorage.getItem("isLoggedIn")===true ? <LandingHeader/> : <HomeHeader/>
    }
  <Spin spinning={loading}>

  <div className="singleBlog">          
            <h1
              className="singleBlog__title"
              style={{ fontFamily: " Lato, sans-serif", fontSize: '32px' }}
            >
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

                      <span>
                      <img width="20" height="20" src="https://img.icons8.com/ios/50/speech-bubble--v1.png" alt="speech-bubble--v1"/>
                        31
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
                        
                        content={userId === singleB.user_id ? <Content /> : <Guest />}
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
        {successMessageVisible && (
      <Alert severity="success">Successfully saved to user List.</Alert>
    )}
          {ReactHTMLparser(singleB?.content)}
         

          {/* <div dangerouslySetInnerHTML={{ __html: singleB?.content }} />*/}
          
        </div>
  </div>          
  </Spin>
  </>




  );
}

export default DisplayStory;
