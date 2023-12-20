import React from 'react'
import './css/StoryConfirmation.css'


const StoryConfirmation = () => {
  return (
    <div className='confirmStoryWrapper'>
        <div className='confirmStoryLeft'>
            <h2>Story Preview</h2>
            <div className='imageCaption'>
                <span>Include a high-quality image in your story to make it more inviting to readers.</span>
            </div>
            <form className='formStoryConfirmation'>
                <input placeholder='Write a preview title'/>
                <input placeholder='Write a preview subbtitle' />
            </form>
            <div className='confirmStoryNote'>
                <span><strong>Note:</strong>  Changes here will affect how your story appears in public places like Medium’s homepage and in subscribers’ inboxes — not the contents of the story itself.</span>

            </div>
        </div>
        <div className='confirmStoryRight'>
            <span>Publishing to : <strong>Mahamoud Ouchar</strong></span>
            Add or change topics (up to 5) so readers know what your story is about:
            <input placeholder='Add a topic'/>
            <button>Publish now</button>
        </div>
    </div>
  )
}

export default StoryConfirmation