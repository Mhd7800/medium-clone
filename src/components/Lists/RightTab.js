import React from 'react'
import RecommendedTopic from './RecommendedTopic'
import WhoToFollow from '../LandingPage/WhoToFollow'

const RightTab = () => {
  return (
    <div>
          <div className='RecommendedTopics'>
            <RecommendedTopic/>
        </div>
        <div className='WhoToFOllow'>
        <WhoToFollow/>
        </div>
        <div className='ReadingLiist'>
          <h4>Reading List</h4>
        Click the  on any story to easily add it to your reading list or a custom list that you can share.
        </div>
    </div>
  )
}

export default RightTab