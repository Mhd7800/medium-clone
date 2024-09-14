import React, { useEffect, useState } from 'react'
import { AuthModal } from './Modal/AuthModal';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import './homecss/index.css'

export default function 
() {

  const [isOpen, setIsOpen] = useState(false);

    const handleCancel = ()=>{
        setIsOpen(false)
    }
    const handleOk = () =>{
        setIsOpen(false)
    }
    const showModal =()=>{
        setIsOpen(true)
    }


  return (
    <div className='home-main'>
        <div className='home-main-container'>
        <div className='home-main-content'>
            <h3>
            Stay curious..
            </h3>
            <h6>
            Discover stories, thinking, and expertise from writers on any topic.
            </h6>
            <button onClick={showModal}>
                Start Reading.
            </button>
        </div>
        <div className='home-main-animation'>
            {/*<img src='https://firebasestorage.googleapis.com/v0/b/medium-clone-3c1d7.appspot.com/o/images%2FM.png?alt=media&token=7b73716c-fbd8-438f-87ad-25fc5d3562ce'></img>*/}
          </div>
        </div>
        <div>
        </div>
        <AuthModal
                isOpen={isOpen}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />   
    </div>
  )
}
