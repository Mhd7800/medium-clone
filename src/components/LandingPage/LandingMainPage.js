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
const { TabPane } = Tabs;




const LandingMainPage = () => {
  

    //const [tab, setTab] = useState(0);
    const [popularTopics, setPopularTopics] = useState([]); //testing
    const [selectedTopic, setSelectedTopic] = useState(null); //testing
    const [topicPosts, setTopicPosts] = useState([]); //testing
    const user = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const [stories,setStories] = useState([]);
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState(0);
    //console.log(userDetails);
    const [stories,setStories] = useState();
    const [users, setUsers] = useState();

    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();
    const topicIndex = 0;

    /*const onChange = (key: string) => {
        console.log(key);
      };*/
      
    
    
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
    
      const topics = [
        'Fashion', 'Beauty', 'Travel', 'Lifestyle', 'Personal', 'Tech', 'Health',
        'Fitness', 'Wellness', 'SaaS', 'Business', 'Education', 'Food and Recipe',
        'Love and Relationships', 'Alternative topics', 'Green living', 'Music',
        'Automotive', 'Marketing', 'Internet services', 'Finance', 'Sports',
        'Entertainment', 'Productivity', 'Hobbies', 'Parenting', 'Pets', 'Photography', 'Agriculture'
      ];

      useEffect(() => {
        // Fetch popular topics from the server
        axios.get('http://localhost:8080/api/v1/posts/popular-topics')
          .then(response => {
            setPopularTopics(response.data.slice(0, 5)); // Assuming the API returns an array of popular topics
          })
          .catch(error => {
            console.error('Error fetching popular topics:', error);
          });
      }, []);
    
      const handleTabChange = topic => {
        // Fetch posts for the selected topic
        axios.get(`http://localhost:8080/api/v1/posts/topics/${topic}`)
          .then(response => {
            console.log(`Fetched posts for ${topic}:`, response.data); // Debugging
            setTopicPosts(response.data); // Assuming the API returns an array of posts for the selected topic
            setSelectedTopic(topic);
            console.log('selected topic : '+ topic) 
          })
          .catch(error => {
            console.error(`Error fetching posts for ${topic}:`, error);
          });
      };
      


  
    return (
    <div className='landing-main'>
        <div className='landing-main-container'>
            {/*<div className='landing-main-left'>
            <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            items={[
            {
                label: `For you`,
                key: '1',
                children: (
                  <div>
    {
                    stories?.length > 0 ? (
                      stories.map((data) => (
                        <LandingRecommendedPost
                          key={data.id} // Use a unique identifier
                          story={data}
                        />
                      ))
                    ) : (
                      <p>No stories available.</p>
                    
                 )
                  }   
             </div>                     
                ),
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
          
          </div>*/}
          <Tabs defaultActiveKey={popularTopics[0]} onChange={handleTabChange}>
            {popularTopics.map(topic => (
              <TabPane tab={topic} key={topic}>
                {selectedTopic === topic ? (
                  topicPosts.map(post => (
                    <LandingRecommendedPost
                      key={post.id}
                      story={post}
                    />
                  ))
                ) : (
                  <Skeleton active />
                )}
              </TabPane>
            ))}
          </Tabs>

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