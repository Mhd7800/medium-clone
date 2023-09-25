import React from 'react'
import HomeHeader from '../HomeHeader'
import '../css/index.css'
import HomeMain from '../HomeMain'
import RecommendedPost from '../RecommendedPost'

export default function index() {
  return (
    <div>
        <HomeHeader />
        <HomeMain/>
        <RecommendedPost/>
    </div>
  )
}
