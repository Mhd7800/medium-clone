import React from 'react'
import "./css/StoryPublished.css"

const StoryPublished = (postDto) => {
  return (
    <div className='storyPublishedWrapper'>
        <div className='storyPublishedUpper'>
            <h2>Your Story is published</h2>
            <span>
                This story isn't eligible to earn money. To make this story eligible, join the Medium Partner Program.
                <a src=''>Learn more</a>
            </span>
           
        </div>
        
        <div className='storyPublishedBottom'>
            Share your story with the world
            <button>
                Copy link
            </button>
        </div>

    </div>
  )
}

export default StoryPublished