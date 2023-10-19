import React from 'react'
import './css/About.css'
const About = () => {
  return (
    <div className='profileAbout'>
        <div className='aboutWrapper'>
            <div className='aboutContent'>
                <h3>Tell the world about yourself</h3>
                <p>Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.</p>
                <button>Get Started</button>
            </div>
            <div className='about-line'>
            <hr></hr>
            </div>
            <div className='aboutFollowing'>
                <span style={{color:'green'}}>1 Following</span>
            </div>
        </div>
    </div>
  )
}

export default About