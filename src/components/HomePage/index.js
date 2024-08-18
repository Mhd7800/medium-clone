import React, { useEffect } from 'react'
import HomeHeader from '../HomePage/HomeHeader'
import './homecss/index.css'
import HomeMain from '../HomePage/HomeMain'
import RecommendedPost from '../HomePage/RecommendedPost'
import { signInWithPopup } from "firebase/auth";
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../firebase'

function Index() {
  
  return (
    <div>
        <HomeHeader />
        <HomeMain />
        <RecommendedPost/>
    </div>
  )
}

export default Index