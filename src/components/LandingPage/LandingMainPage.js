import { Skeleton } from 'antd';
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import LandingRecommendedPost from "./LandingRecommendedPost "
import WhoToFollow from "./WhoToFollow"
import "./css/LandingMainPage.css"
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectUserId } from '../../features/userIdSlice';
import getUserInfoById from '../getUserInfo';
import axios from 'axios';
import Test from './Test';



const LandingMainPage = () => {
  
    const [tab, setTab] = useState(0);
    const user = useSelector(selectUser);
    const userId = useSelector(selectUserId);


    const [stories,setStories] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();

    useEffect(()=>{
        getUserInfoById(userId)
      .then((user)=>{
        setUserDetails(user);
      })
      
      },[userId])

      useEffect(() => {
        const getStories = async () => {
          try {
            const response = await fetch(
              `http://localhost:8080/api/v1/posts`
            );
            const fetchedStories = await response.json();
            console.log('Fetched Stories:', fetchedStories); 
            setStories(fetchedStories);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
      
        getStories();
      }, []);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch("http://localhost:8080/api/v1/user/allUsers");
                const fetchedUsers = await response.json();

                let _users = fetchedUsers?.filter((data) => data?.id !== userDetails?.id)
                setUsers(_users);
                setUserLoading(false);

            } catch (err) {
                console.log(err.response.data.message);
              setUserLoading(false);
            }
        }
        getUsers();
      }, [userDetails]);
    



  
    return (
    <div className='landing-main'>
        <div className='landing-main-container'>
            <div className='landing-main-left'>
                <div className='landing-main-tabs'>
                    <div onClick={()=> setTab(0)}
                        className='{`tab ${tab === 0 && "active"}`}'
                    >
                        <span>
                            FOLLOWING
                        </span>
                    <div onClick={()=> setTab(1)} 
                    className={`tab ${tab === 1 && "active"}`}
                    >
                        <span>RECOMMENDED FOR YOU</span>
                    </div>
                    </div>
                    <div className='landing-write-story'>
                        <h6>Share your history with millions of readers</h6>
                        <Link to="/new-story">
                            <button>Write on Medium</button>
                        </Link>
                    </div>
                    {tab === 0 && (
                        <>
                            {users?.map((data)=>
                            (<WhoToFollow key={data?._id} data={data} />)
                            )}
                        </>
                    )}
                    {tab === 1 && (
                        <div className='landing-recommended-posts'>
                            {[...Array(10)].map((_,index)=>{
                                return (
                                    <>
                                        {loading && (
                                            <Skeleton.Button 
                                            key={index}
                                            style={{
                                                margin:"10px 0",
                                            }}
                                            active = {true}
                                            size={'large'}
                                            shape={"default"}
                                            block={true}
                                            />
                                        )}
                                    </>
                                )
                            })} 
                            {stories?.map((data)=>(
                                <LandingRecommendedPost userDetails={userDetails} key={data?._id} data={data}/>
                            ))}  
                            
                        </div>
                    )}
                </div>
                <div className='landing-main-right'>
                    <div className='recommended-topics'>
                        <h2>Recommended topics</h2>
                        <div className='topic'>
                            <span>Technology</span>
                            <span>Money</span>
                            <span>Business</span>
                            <span>Productivity</span>
                            <span>Pychology</span>
                            <span>Art</span>
                        </div>
  {/* 
                        <span>Stories:</span>
                            <span>{stories.content[0].title}</span>
                            <span>{stories?.content[0]?.content}</span>
                          
                            <ul>
                            {stories.content.map((story) => (
                                <li key={story.title}>
                                <h3>{story.title}</h3>
                                <p>Read Time: {story.read_time}</p>
                                <p>Content: {story.content}</p>
                                <p>Created Date: {story.created_date}</p>
                               
                                </li>
                            ))}
                            </ul>
                       

                            <span>Users:</span>
                            <span>{JSON.stringify(users)}</span>
                            <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
             
            </li>
          ))}
        </ul>
    */}
                    </div>
                   <WhoToFollow/>
                   
                </div>
                           
            </div>
            Hi
        </div>
    </div>
  )
}


export default  LandingMainPage