import React, {useEffect, useState} from 'react'
import axios from 'axios'
import DOMPurify from 'dompurify';
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





const Home = ({post, userInfo, userId, user_id}) => {

    //const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);

    

    const addToList = async() => {
      try {
        // Send a POST request to your backend endpoint to save the post
        await axios.post(`http://localhost:8080/api/v1/${userId || user_id}/addPostToList/${post.id}`);
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

     
    
    
  return (
            <div className='userposts'
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
           
              </div>
              {/* Render other post details as needed */}
            </div>
          )}
        
         

          

export default Home
