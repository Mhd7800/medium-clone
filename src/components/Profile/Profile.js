import React from 'react'
import LandingHeader from '../LandingPage/LandingHeader'
import { Avatar, Image, Popover } from 'antd'
import Footer from '../footer/Footer'
import "./css/profile.css"
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import ListItem from './ListItem'
import { useState } from 'react'
import About from './About'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Profile = () => {

/*const [toggle, setToggle] = useState(1);

const updateToggle =((id)=>{
    setToggle(id);
})*/


const user = useSelector(selectUser);

  return (
    <div className='profilePage'>
        <div className='profileHeader'>
            <LandingHeader/>
        </div>

    <div className='profileContainer'>
        <div className='profileLeftContent'>
            <div className='profileName'>
                <span>{user?.providerData?.displayName}</span>
                <p>...</p>
            </div>
            <div className='profileTabElement'>

                {/*<button className={`toggle-button ${toggle===1 ? "selected-button" : ""}`}
                onClick={(()=>updateToggle(1))}>Home</button>
                <button className={`toggle-button ${toggle===2 ? "selected-button" : ""}`}
                onClick={(()=>updateToggle(2))}>About</button>
            
                {toggle ===1 ? <ListItem /> : <About/>}*/}

                <Tabs>
                    <TabList>
                    <Tab>Home</Tab>
                    <Tab>About</Tab>
                    </TabList>

                    <TabPanel>
                    <ListItem/>
                    </TabPanel>
                    <TabPanel>
                    <About />
                    </TabPanel>
                </Tabs>


            </div>
            </div>
            <div className='line'>
                <hr></hr>
            </div>
        <div className='profileRigthContent'>
            <div className='profileRightUpper'>
            <Avatar 
                    size={75}
                    style={{cursor:"pointer"}}
                    src={
                        <Image
                          preview={false}
                          src={user?.providerData?.photoURL ?? 'http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3'}
                        />
                      }
                ></Avatar>
            <h3>{user?.providerData?.displayName}</h3>
            <p>about me</p>
            <span style={{color:"green"}}>Edit profile</span>
            </div>
            <div className='proileFooter'>
            <Footer/>
            </div>
            
        </div>

        
        
    </div>
    </div>
  )
}

export default Profile