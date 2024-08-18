import React, {useEffect, useState} from 'react'
import axios from 'axios'
import DOMPurify from 'dompurify';
import './css/Home.css'
import { Avatar, Image, Popover } from 'antd'
import { Tooltip } from "antd";
import getUserInfoById from '../getUserInfo';
import reactHtmlParser from "react-html-parser";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';





const Home = ({post, userInfo}) => {

    //const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);

    

    const addToList = async() => {
      try {
        // Send a POST request to your backend endpoint to save the post
        await axios.post(`http://localhost:8080/api/v1/${userInfo.id}/addPostToList/${post.id}`);
        setSuccessMessageVisible(true); 
        setTimeout(() => {
          setSuccessMessageVisible(false); // Hide the success message after 1 second
        }, 1000);
        console.log('Post saved successfully');
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

      const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
      };
    
      const Content = ()=>{
        return (
          <div>
            <span style={{cursor:'pointer'}}>
              <Link to={`/updateStory/${post.id}`}>Edit Post</Link>
            </span><br></br>
            <span style={{cursor:'pointer', color:'red'}} onClick={() => handleDelete(post.id)}>Delete Post</span>
          </div>
        )
    }

    const handleDelete = async (postId) => {
      try {
        setIsDeleting(true);
        await axios.delete(`http://localhost:8080/api/v1/posts/${postId}`);
        window.location.reload(false);
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setIsDeleting(false);
      }
    };
    
  return (
            <div className={`userposts ${isDeleting ? 'fade-out' : ''}`}
             key={post.id}>
              <div className='HomeUserInfo'>
                <Avatar
                size={25}
                src={userInfo?.photoURL}
                >
                </Avatar>
                <span>{userInfo?.name}</span>
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
              {successMessageVisible && (
      <Alert severity="success">Successfully saved to user List.</Alert>
    )}
              <Tooltip title="Save">
              <span 
              style={{cursor:"pointer"}}
              onClick={() => addToList(post?.id)}
              >
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
            <Content/>
            }
            placement="bottom"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            >
              <Button type='text' style={{justifyContent:'center', alignContent:'center'}}>
              <svg class="eh el py" width="25" height="25">
                <path
                  d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z"
                  fillRule="evenodd"
                ></path>
              </svg>
              </Button>
            
            </Popover>
              </div>
              {/* Render other post details as needed */}
            </div>
          )}
        
         

          

export default Home
