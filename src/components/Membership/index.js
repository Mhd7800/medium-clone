import React from 'react'
import HomeHeader from '../HomePage/HomeHeader'
import './css/index.css'
import { Avatar } from 'antd'
import SocialProof from './SocialProof'
import Footer from "../footer/Footer"
import MembershipHeader from './MembershipHeader'

const index = () => {
  return (<>
            <MembershipHeader/>
            <div className='membership'>
                <div className='top-content'>
                    <h1>Fuel great thinking.</h1>
                    <h6>Become a Medium member to enjoy unlimited access and <br />
                    directly support the writers you read most.</h6>
                    <button>Get unlimited access</button>
                </div>
                <div>
                </div>
                <div className='middle-content'>
                    <div className='middle-left-content'>
                        <h2>
                        Get unlimited access to every
                        story.
                        </h2>
                        <img src='https://cdn-static-1.medium.com/sites/medium.com/membership/images/UnlimitedReading.svg'></img>
                        <p>
                        Read any article in our entire library across all your devices — with no paywalls, story limits or ads.
                        </p>
                    </div>
                    <hr></hr>
                    <div className='middle-right-content'>
                        <h2>
                        Support the voices you want
                         to hear more from.
                        </h2>
                        <img src='https://cdn-static-1.medium.com/sites/medium.com/membership/images/SupportWriters.svg'>
                        </img>
                        <p>
                        A portion of your membership will directly support the writers and thinkers you read the most.
                        </p>
                    </div>
                </div>
                {/*<div className='social-proof'>
                    <p className='title'>
                    Why I'm a Medium Member...
                    </p>
                 <div className='social-proof-left'>
                    <Avatar
                    >

                    </Avatar>
                 </div>

                 <div className='social-proof-right'>
                </div>   
                </div>*/}
                <div className='social-proof' style={{backgroundColor:'white'}}>
                    <p className='title'>
                    Why I'm a Medium Member... 
                    </p>
                    <SocialProof/>
                </div>
                <div className='bottom'>
                    
                    <h2>
                    Take your mind <br></br>in new directions.
                    </h2>
                    <button>Get unlimited access</button>
                    <img src='https://cdn-static-1.medium.com/sites/medium.com/membership/images/Membership_Footer.svg'>
                    </img>
                </div>
                <Footer/>
            </div>
            
        </>
    
  )
}

export default index