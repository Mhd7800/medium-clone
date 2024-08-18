import React from 'react'
import { Avatar, Image, Popover } from 'antd'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { selectUserId } from '../../features/userIdSlice'
import getUserInfoById from '../getUserInfo'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { selectUser_id } from '../../features/authSlice'


const ListItem = ({userInfo}) => {
    const user = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const user_id = useSelector(selectUser_id);
    
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);

    const navigate = useNavigate();

    

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an asynchronous API call using axios
        const response = await axios.get(`http://localhost:8080/api/v1/getUserList/${userInfo.id}`);
        
        // Update state with the data received from the API response
        setUserList(response.data);
  
        // Log the first item of the user list to the console
        console.log('user list:', response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching user list:', error);
      }
    };
  
    // Call the fetchData function when the component mounts or userId changes
    fetchData();
  }, [userInfo.id]);
  
  




  return (
    <div className='profileListItem'>
                <div className='profileLeftItem'>
                <div className='profileLeftItemInfo'>
                <Avatar 
                    size={35}
                    style={{cursor:"pointer"}}
                    src={
                        <Image
                          preview={false}
                          src={userInfo?.photoURL ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                        />
                      }
                ></Avatar>
                <span>{userInfo?.name}</span>
                </div>
                <h3>Reading List 🔒</h3>
                <div className='profileleftItemBottom'>
                <span>{userList.length} stories</span>
                <span >...</span>
                </div>
                </div>

                <div className='profileRightItem'>

                    {userList.slice(0,3).map((userListItem, index)=>(
                        <div key={index} >
                            <Link to={`/display/${userListItem.id}`}>
                            <img src='https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jfdwtvU6V6g99q3G7gq7dQ.png'></img>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
  )
}

export default ListItem