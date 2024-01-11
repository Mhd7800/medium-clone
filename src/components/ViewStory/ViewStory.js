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
import getUserInfoById from "../getUserInfo"


const ViewStory = () => {

    const user = useSelector(selectUser);
    const {encodedUserName, encodedTitle} = useParams();
    const userId = useSelector(selectUserId);
    const [loading, setLoading] = useState(false)
    const [singleB, setSingleB] = useState();
    const [userDetails, setUserDetails] = useState();
    const navigate = useNavigate()
    const [modal, setModal] = React.useState(false);


    useEffect(()=>{
        getUserInfoById(userId)
      .then((user)=>{
        setUserDetails(user);
      })
      
      },[userId])

      const addToList = (()=>{
        
      })

      useEffect(() => {
        if (encodedTitle) {
            setLoading(true);
            const decodedTitle = decodeURIComponent(encodedTitle); 
            axios.get(`http://localhost:8080/api/v1/posts/${decodedTitle}`)
                .then((res) => {
                    console.log('The newly fetched blog is here: '+res.data.data);
                    setSingleB(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        }
    }, [encodedTitle]);


  return (
<>

    {
        user ? <LandingHeader /> : <HomeHeader/>
    }

<Spin spinning={loading}>

            <div className="singleBlog">
            
        <h1
          className="singleBlog__title"
          style={{ fontFamily: " Lato, sans-serif", fontSize: '32px' }}
        >
          {ReactHTMLparser(singleB?.title)}
        </h1>
        {
                singleB?.userDetails && 
                
                <div className='singleBlog_author'>
                    <div className = 'singleBlog_left'>
                        <div className='author-details'>
                            <div>
                                <Avatar size={'large'} src = {singleB?.userDetails[0]?.photoURL} />
                            </div>
                            <div className='author-name'>
                                <strong>
                                    {singleB?.userDetails[0]?.name}
                                </strong>
                                <span>{moment(singleB?.created_at).format('DD MMM, YYYY')}</span>
                            </div>
                        </div>
                    </div>
                    <div className = 'singleBlog_right'>
                        <Tooltip title="Save">
                            <span style = {{
                                cursor: 'pointer'
                            }} onClick={addToList}>
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
                        <span style = {{
                                cursor: 'pointer'
                            }}>
                            <svg class="eh el py" width="25" height="25">
                            <path
                                d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z"
                                fillRule="evenodd"
                            ></path>
                            </svg>
                        </span>
                    </div>
                </div>
            }
        <div className="singleBlog__body">
          {ReactHTMLparser(singleB?.content)}
        </div>
        </div>
        
        </Spin>
        <AuthModal 
            signInPopup={async() => await signInWithPopup(auth, provider)}
            open={modal}
            setOpen={setModal}
        />
    
    </>
  )
}

export default ViewStory