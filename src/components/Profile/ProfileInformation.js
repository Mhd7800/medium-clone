import React from 'react'
import { Avatar, Image, Popover } from 'antd'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import './css/ProfileInformation.css'
import { green } from '@mui/material/colors'

const ProfileInformation = () => {
    const user = useSelector(selectUser);

  return (
    <div className='ProfileInformation'>
        <div className='userInfo'>
            <div className='userPhoto'>
                <span>Photo</span>
            <Avatar 
                    size={65}
                    style={{cursor:"pointer"}}
                    src={
                        <Image
                          preview={false}
                          src={user?.providerData?.photoURL ?? 'http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3'}
                        />
                      }
                ></Avatar>
            </div>
            <div className='photoInfo'>
                <div className='photoButtons'>
                    <span style={{color:"green"}}>Update</span>
                    <span style={{color:"tomato"}}>Remove</span>
                </div>
                <div className='photoText'>
                    <span>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</span>
                </div>
            </div>
        </div>

        <div className=''>
            <form className='userForm'>
            <label>Name*</label>
            <input value={user?.providerData?.displayName}></input>
            <span>Appears on your Profile page, as your byline, and in your responses.</span>
            <label>Bio</label>
            <input></input>
            <span>Appears on your Profile and next to your stories.</span>
            <div className='formButtons'>
            <button style={{color:"green", backgroundColor:"white", border:"0.85px solid"}}>Cancel</button>
            <button type='submit' style={{color:"white", backgroundColor:"green"}}>Save</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default ProfileInformation