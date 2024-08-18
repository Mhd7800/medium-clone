import "./css/viewstory.css"
import React , { useEffect, useState } from 'react'
import {auth, provider} from "../../firebase"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/userSlice"
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import LandingHeader from "../LandingPage/LandingHeader"
import HomeHeader from "../HomePage/HomeHeader"
import ReactHTMLparser from "react-html-parser";
import { selectUserId } from "../../features/userIdSlice"
import moment from 'moment';
import { AuthModal } from "../HomePage/Modal/AuthModal"
import { useParams, useNavigate } from "react-router-dom"
import { Avatar, Spin, Tooltip } from 'antd';
import getUserInfoById from "../getUserInfo";


const ViewStory = () => {

  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const [loading, setLoading] = useState(false)
  const [singleB, setSingleB] = useState();
  const [userDetails, setUserDetails] = useState();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [authorInfo, setAuthorInfo] = useState();
  const [authorId, setAuthorId] = useState();



  const navigate = useNavigate();

  useEffect(()=>{
    getUserInfoById(authorId)
  .then((user)=>{
    setAuthorInfo(user);
  })
  },[authorId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/posts/getPostById/${postId}`);
        const postData = await response.json();
        setPostData(postData);
        setSingleB(postData);
        setLoading(false);
        setAuthorId(postData.user_id);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

    const handleSubmit = () =>{
        try{
            setLoading(true);
        
            axios.put(`http://localhost:8080/api/v1/posts/updatePost/${singleB.id}`, postData)
            setLoading(false);
            navigate(`/display/${singleB.id}`)
        }
        catch(error){
            console.error(error)
        }
    }



  return (
<>
        <LandingHeader /> 

<Spin spinning={loading}>

        <div className="singleBlog">
        <h1
          className="singleBlog__title"
          style={{ fontFamily: " Lato, sans-serif", fontSize: '32px' }}
        >
          <input className="inputTitle" value={postData?.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />


        </h1>
        <div className="singleBlog__body">
        <textarea className="inputContent" value={postData?.content}  onChange={(e) => setPostData( {...postData, content: e.target.value})}></textarea>
        </div>
        <div>
        <button className="singleButton" type="submit" 
            disabled={loading} onClick={handleSubmit}>
              {loading ? 'Saving...' : 'Save'}
            </button>
        </div>

        </div>
        
        </Spin>
        

    
    </>
  )
}

export default ViewStory