import {React, useState, useEffect} from 'react'
import { Avatar, Image, Popover } from 'antd'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import './css/ProfileInformation.css'
import { green } from '@mui/material/colors'
import {storage, auth} from "../../firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid";

const ProfileInformation = () => {
    const user = useSelector(selectUser);
    const [image, setImage] = useState();
    const [imageUrl, setImageUrl] = useState(null);

    const handleImageUpload = async () =>{

        if (image) {
            const user = auth.currentUser;
            const storageRef = storage.ref();
            const imageRef = storageRef.child(`profilePictures/${user.uid}/${image.name}`);
            const snapshot = await imageRef.put(image);
            const imageUrl = await snapshot.ref.getDownloadURL();
            setImageUrl(imageUrl);
    }
}

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };


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
                          src={imageUrl ?? user?.providerData?.photoURL }
                        />
                      }
                ></Avatar>
            </div>
            <div className='photoInfo'>
                <div className='photoButtons'>
                <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
                    <span onClick={handleImageUpload} style={{color:"green"}}>Update</span>
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