import { Skeleton } from 'antd';
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import LandingRecommendedPost  from "./LandingRecommendedPost "
import WhoToFollow from "./WhoToFollow"
import "./css/LandingMainPage.css"
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectUserId } from '../../features/userIdSlice';
import getUserInfoById from '../getUserInfo';
import axios from 'axios';
import Test from './Test';
import { Tabs } from 'antd';




const LandingMainPage = () => {
  
    const [tab, setTab] = useState(0);
    const user = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const [stories,setStories] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();

    const onChange = (key: string) => {
        console.log(key);
      };
      
    
    
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
              `http://localhost:8080/api/v1/posts/foryou`
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
            <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            items={[
            {
                label: `For you`,
                key: '1',
                children: `For you content
               
                  `,
            },
            {
                label: `Tab 2`,
                key: '2',
                children: `Content of Tab Pane 2`,
            },
            {
                label: `Tab 3`,
                key: '3',
                children: `Content of Tab Pane 3`,
            },
            ]}
        />
    <h2>This is the for you page</h2>
    <div>
    {
                    stories?.length > 0 ? (
                      stories.map((data) => (
                        <LandingRecommendedPost
                          key={data.id} // Use a unique identifier
                          stories={data}
                        />
                      ))
                    ) : (
                      <p>No stories available.</p>
                    
                 )
                  }   
    </div>                           
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
                    </div>
                  <div className='follow'>
                  <h2>Who to follow</h2>
            {users?.map((data) => (
              <WhoToFollow key={data?._id} data={data} />
            ))}
            {[...Array(5)].map((_, idx) => {
              return (
                <>
                  {userLoading && (
                    <Skeleton key={idx} active avatar paragraph={{ rows: 1 }} />
                  )}
                </>
              );
            })}
                  </div>
                   
                </div>
        </div>
    </div>
  )
}


export default  LandingMainPage