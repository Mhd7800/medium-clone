import React, { useState } from 'react'
import { Skeleton } from "antd";
import Stories from "../MyStories/Stories"

const ListMain =({userDetails})=> {
  
    console.log(userDetails)
  
    return (
    <div className='story-main'>

      <div className='storyLeft-Component'>
        <div className='list-UpperComponent'>
          <span>Your Library</span>
          <button>New List</button>
        </div>
        <div className='listTabElements'>

        </div>
      </div>

      <div className='storyRight-Component'>
        <div className='StaffPicks'>
          Random articles
        </div>
        <div className='RecommendedTopics'>
            RecommendedTopics
        </div>
        <div className='WhoToFOllow'>
        Who to follow
        </div>
        <div className='ReadingLiist'>
          Reading List
        </div>
      </div>
        
    </div>
  )
}

export default ListMain;
