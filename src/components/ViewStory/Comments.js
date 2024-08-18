import React, {useState} from 'react'
import './css/Comments.css'
import getUserInfoById from '../getUserInfo';
import axios from 'axios';



const Comments = ({ comments, userDetails, togglePopover,postId, onCommentSubmit}) => {

  const [comment, setComment] = useState('');
  //const userInfo = getUserInfoById(comment.id);
  


  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
     const response = await axios.post(`http://localhost:8080/api/v1/posts/${postId}/comments`,{
        body: comment,
        name:userDetails.name,
        user_id: userDetails.id,
        photoURL: userDetails.photoURL,
        publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),    
      })
      console.log('Comment submitted:', comment);
      const newComment = response.data;
      setComment('');
      onCommentSubmit(newComment);
    } catch (error) {
      console.log('Failed to comment:'+ error)
    }
  };


  return (
    <div className="comment-section">
      <div className="close-button" onClick={togglePopover}>X</div>

      <div className='commentForm'>
      <div className='commentFormUpper'>
        <img src={userDetails.photoURL} alt='user-profile picture'></img>
        <span>{userDetails.name}</span>
      </div>
      <div className='commentContent'>
        <input
          value={comment}
          onChange={handleChange}
          placeholder='What are your thoughts'
        />
      </div>
      <div className='commentButtons'>
        <button className="cancelButton" onClick={togglePopover}>Cancel</button>
        <button onClick={(event) => handleSubmit(event)} className="respondButton">Respond</button>
      </div>
    </div>

      {comments.map((comment, index) => (
        <div className="comment" key={index}>
          <div className='upperComment'>
          <img className="profile-pic" src={comment?.photoURL} alt="Profile" />
          <div className='upperCommentRight'>
          <span className="username">{comment?.name}</span>
          <span >{comment?.publishedDate}</span>
            </div>
          </div>
          <div className="comment-details">
            {/*<span className="comment-date">{comment.creationDate}</span>*/}
            <p className="comment-text">{comment?.body}</p>
            <span className="like-count">{comment?.likes} Likes</span>
          </div>
        </div>
      ))}

   

    </div> 
  )
}

export default Comments
