import { Skeleton } from 'antd';
import React, { useState, useEffect } from 'react'
import { selectUser_id } from '../../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import LandingRecommendedPost  from "./LandingRecommendedPost "
import WhoToFollow from "./WhoToFollow"
import "./css/LandingMainPage.css"
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectUserId } from '../../features/userIdSlice';
import getUserInfoById from '../getUserInfo';
import axios from 'axios';
import { Tabs } from 'antd';
import { message } from 'antd';
import { set } from 'firebase/database';


const { TabPane } = Tabs;


const LandingMainPage = () => {
  

    //const [tab, setTab] = useState(0);
    const [popularTopics, setPopularTopics] = useState([]); //testing
    const [selectedTopic, setSelectedTopic] = useState(null); //testing
    const [topicPosts, setTopicPosts] = useState([]); //testing
    const user = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const user_id = useSelector(selectUser_id);
    
    const [stories,setStories] = useState([]);
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [canfollowUsers, setCanFollowUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();
    const topicIndex = 0;
    const [followingPosts, setfollowingPosts] = useState([]);
    const [followingPostsLoading, setFollowingPostsLoading] = useState(true);
    

    /*const onChange = (key: string) => {
        console.log(key);
      };*/

        const fetchFollowingPosts = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/v1/posts/getPostByFollowings/${userDetails.username}`);
            const data = await response.json();
            setfollowingPosts(data);
            console.log('following posts:', followingPosts);
            setFollowingPostsLoading(false);
          } catch (error) {
            console.log('error fetching following posts:', error);
            setFollowingPostsLoading(false);
          }
        };
      
      useEffect(() => {
        fetchFollowingPosts();
      }, [userDetails]);
      
  
    useEffect(()=>{
        getUserInfoById(userId || user_id)
      .then((user)=>{
        setUserDetails(user);
      })
      },[userId || user_id])


      useEffect(()=>{
        console.log('userId :' + userId)
        console.log('user_id :' + user_id)
        fetchCanFollow();
        //console.log('userDetails:' + userDetails.username)
      },[userDetails])


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

    
      const topics = [
        'Fashion', 'Beauty', 'Travel', 'Lifestyle', 'Personal', 'Tech', 'Health',
        'Fitness', 'Wellness', 'SaaS', 'Business', 'Education', 'Food and Recipe',
        'Love and Relationships', 'Alternative topics', 'Green living', 'Music',
        'Automotive', 'Marketing', 'Internet services', 'Finance', 'Sports',
        'Entertainment', 'Productivity', 'Hobbies', 'Parenting', 'Pets', 'Photography', 'Agriculture'
      ];

      useEffect(() => {
        axios.get('http://localhost:8080/api/v1/posts/popular-topics')
          .then(response => {
            setPopularTopics(response.data.slice(0, 5)); 
          })
          .catch(error => {
            console.error('Error fetching popular topics:', error);
          });
      }, []);
      
    
      const handleTabChange = (key) =>{
        if (key === 'following'){
          setTab(key);
        }
        else {
          axios.get(`http://localhost:8080/api/v1/posts/topics/${key}`)
            .then(response => {
              console.log(`Fetched posts for ${key}:`, response.data); // Debugging
              setTopicPosts(response.data); 
              setSelectedTopic(key);
              console.log('selected topic : '+ key);
            })
            .catch(error => {
              console.error(`Error fetching posts for ${key}:`, error);
            });
        }
      }
      
      
      
      const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
      };

      
        const fetchCanFollow = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/can-follow?userName=${userDetails?.username}`);
            setCanFollowUsers(response.data);
          } catch (error) {
            console.log('Failed because of: ' + error);
          }
        };
       

      const handleFollow = async (authorId) => {
        try {
          const response = await axios.post(`http://localhost:8080/api/v1/follow?followerId=${userId || user_id}&followingId=${authorId}`);
          if (response.status === 200) {
            message.info('Followed successfully');
            // Update the follow status immediately
            setCanFollowUsers(prevUsers => prevUsers.map(user => user._id === authorId ? { ...user, isFollowing: true } : user));
            fetchCanFollow();
            fetchFollowingPosts();
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
            message.success('Unfollowed successfully');
            // Update the follow status immediately
            setCanFollowUsers(prevUsers => prevUsers.map(user => user._id === authorId ? { ...user, isFollowing: false } : user));
            fetchCanFollow();
            fetchFollowingPosts();
          }
        } catch (error) {
          console.error('Error unfollowing user:', error);
          message.error('Failed to unfollow user');
        }
      };

  
      return (
        <div className='landing-main'>
          <div className='landing-main-container'>
            
            <Tabs defaultActiveKey="following" onChange={handleTabChange}>
              
              {followingPostsLoading ? (
                    <Skeleton active />
                ) : (
                    <TabPane tab="Following" key="following">
                        {followingPosts.map(post => (
                            <LandingRecommendedPost
                                key={post.id}
                                story={post}
                                fetchFollowingPosts={fetchFollowingPosts}
                                handleFollow = {handleFollow}
                                handleUnfollow = {handleUnfollow}
                                canfollowUsers = {canfollowUsers}
                            />
                        ))}
                    </TabPane>
                )}

              {popularTopics.map(topic => (
                <TabPane tab={topic} key={topic}>
                  {selectedTopic === topic ? (
                    topicPosts.map(post => (
                      <LandingRecommendedPost
                        key={post.id}
                        story={post}
                        handleFollow = {handleFollow}
                        handleUnfollow = {handleUnfollow}
                        canfollowUsers = {canfollowUsers}
                      />
                    ))
                  ) : (
                    <Skeleton active />
                  )}
                </TabPane>
              ))}
            </Tabs>
            <hr></hr>
            {/* line*/}
            <div className='landing-main-right'>
              <div className='recommended-topics'>
                <h2>Recommended topics</h2>
                <div className='topic'>
                  {popularTopics.map((topic, index) => (
                    <span key={index}>{topic}</span>
                  ))}
                </div>
              </div>
              <div className='follow'>
                <h2>Who to follow</h2>
                {canfollowUsers.length > 0 ? (
                  canfollowUsers.slice(0, 5).map((data) => (
                    <WhoToFollow
                      key={data?._id}
                      data={data}
                      handleFollow={handleFollow}
                      handleUnfollow={handleUnfollow}
                    />
                  ))
                ) : (
                  [...Array(5)].map((_, idx) => (
                    <Skeleton key={idx} active avatar paragraph={{ rows: 1 }} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
}


export default  LandingMainPage