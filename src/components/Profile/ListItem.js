import React from 'react'
import "./css/profile.css"
import { Avatar, Image, Popover } from 'antd'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { selectUserId } from '../../features/userIdSlice'
import getUserInfoById from '../getUserInfo'
import { useState, useEffect } from 'react'


const ListItem = () => {
    const user = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const [userData, setUserData]= useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
          try {
              setLoading(true);
              const user = await getUserInfoById(userId);
              console.log('User Data:', user);
              setUserData(user);
          } catch (error) {
              // Handle the error if needed
          } finally {
              setLoading(false);
          }
      };
  
      fetchData();
  }, [userId]);
    


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
                          src={userData?.photoURL ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                        />
                      }
                ></Avatar>
                <span>{userData?.name}</span>
                </div>
                <h3>Reading List 🔒</h3>
                <div className='profileleftItemBottom'>
                <span>3 stories</span>
                <span >...</span>
                </div>
                </div>

                <div className='profileRightItem'>
                    <img src='https://plus.unsplash.com/premium_photo-1682129568869-c261386bc66c?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                    <img src='https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?auto=format&fit=crop&q=80&w=1912&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                    <img src='https://media.istockphoto.com/id/147461270/tr/foto%C4%9Fraf/hot-sports-car.jpg?s=2048x2048&w=is&k=20&c=wrBw_dfdoJ3ZJBmNQstOsn__oZCJYTH3RYiYodB6KWE='></img>
                </div>
            </div>
  )
}

export default ListItem