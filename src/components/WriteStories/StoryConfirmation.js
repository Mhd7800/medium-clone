import React, { useState, useEffect } from 'react';
import './css/StoryConfirmation.css';
import ReadTime from '../ReadTime';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StoryPublished from './StoryPublished';
import getUserInfoById from '../getUserInfo';
import { Link, useNavigate, useParams } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};
 

const StoryConfirmation = ({ postDto, onCancel }) => {
  const [query, setquery] = useState('');
  const [results, setResults] = useState([]);
  const { title, content, read_time, user_id, created_date, comments } = postDto;
  const [open, setOpen] = React.useState(false);
  const [close, setClose] = React.useState(false);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  const encodedUserName = encodeURIComponent(userName);
  
  

  const handleClose = () => {
    setOpen(false)
    setClose(true)
  };
  
  const handleOpen = async () => {
    setOpen(true);
  };
  
  const handleCancel = () => {
    setOpen(false);
  };


  const [blogInfo, setBlogInfo] = useState({
    title : title,
    content: content,
    read_time : read_time,
    created_date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),   
    comments: [],
    user_id: user_id,
    topic: query,
  })

 

  useEffect(()=>{
    getUserInfoById(user_id)
  .then((user)=>{
    //console.log('user info :'+ user.name)
    setUserName(user.name);
  })
  
  },[user_id])

  const confHeader = {
    "Content-Type": "application/json",
  };


  const handleSubmitStory = async () => {
    try {
      
    console.log('blogInfo after update:', JSON.stringify(blogInfo, null, 2));
      
      // Assuming you have the correct API endpoint for saving the post
      const res = await axios.post('http://localhost:8080/api/v1/posts', blogInfo, confHeader);

        if(res.status === 201){
          console.log(res.data.message);
          console.log(res.data);
          console.log('saved sucessfully');
          const encodedTitle = encodeURIComponent(res.data.title);
          //navigate(`/story/@${encodedUserName}/${encodedTitle}`)
          navigate(`/display/${res.data.id}`)
          };
         //console.log(res.data); 
          
      //handleOpen(); // Open the modal after successful submission
     
      
    } catch (error) {
      console.error('Error creating data:', error.response.data.message);
    }
  };
  
  

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setquery(inputValue);
    const filteredResults = suggestedTopics.filter(topic =>
      topic.toLowerCase().includes(inputValue.toLowerCase())
    );
    setResults(filteredResults);
  };

  const handleSelect = (selectedItem) => {
    setquery(selectedItem);
    setResults([]);
    setBlogInfo({...blogInfo, topic: selectedItem})
  };

  const suggestedTopics = [
    'Fashion', 'Beauty', 'Travel', 'Lifestyle', 'Personal', 'Tech', 'Health',
    'Fitness', 'Wellness', 'SaaS', 'Business', 'Education', 'Food and Recipe',
    'Love and Relationships', 'Alternative topics', 'Green living', 'Music',
    'Automotive', 'Marketing', 'Internet services', 'Finance', 'Sports',
    'Entertainment', 'Productivity', 'Hobbies', 'Parenting', 'Pets', 'Photography', 'Agriculture'
  ];

  return (
    <div className='confirmStoryWrapper'>
      <div className='confirmStoryLeft'>
            <h2>Story Preview</h2>
            <div className='imageCaption'>
                <span>Include a high-quality image in your story to make it more inviting to readers.</span>
            </div>
            <form className='formStoryConfirmation'>
                <input placeholder='Write a preview title'
                value={postDto.title}
                />
                <input placeholder='Write a preview subbtitle'
                value={postDto.content}
                />
            </form>
            <div className='confirmStoryNote'>
                <span><strong>Note:</strong>  Changes here will affect how your story appears in public places like Medium’s homepage and in subscribers’ inboxes — not the contents of the story itself.</span>

            </div>
        </div>
      <div className='confirmStoryRight'>
        <span>Publishing to: <strong>{userName}</strong></span>
        <div className="searchContainer">
          <label>Add or change topics (up to 5) so readers know what your story is about:</label>
          <div className="searchBar">
          <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {results.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {item}
          </li>
        ))}
      </ul>
           
          </div>
        </div>
        <button onClick={handleSubmitStory} >
          Publish now
        </button>
      </div>
      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <StoryPublished  blogInfo={blogInfo} onCancel={handleCancel}/>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default StoryConfirmation;








