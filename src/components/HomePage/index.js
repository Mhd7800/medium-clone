import React from 'react'
import HomeHeader from '../HomePage/HomeHeader'
import '../css/index.css'
import HomeMain from '../HomePage/HomeMain'
import RecommendedPost from '../HomePage/RecommendedPost'

export default function index() {
  return (
    <div>
        <HomeHeader />
        <HomeMain/>
        <RecommendedPost/>
    </div>
  )
}
