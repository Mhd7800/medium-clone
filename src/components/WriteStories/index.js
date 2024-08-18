import React, { useState } from 'react';
import Editor from 'react-medium-editor';
import LandingHeader from '../LandingPage/LandingHeader';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserId } from '../../features/userIdSlice';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/beagle.css';
import './css/index.css';
import ReadTime from "../ReadTime"
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StoryConfirmation from './StoryConfirmation';
import { selectUser_id } from '../../features/authSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height:500,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};



const Index = () => {
  const userId = useSelector(selectUserId);
  const user_id = useSelector(selectUser_id);
  const [open, setOpen] = React.useState(false);
  const [close, setClose] = React.useState(false);
  const [read_time, setReadTime] = useState('');

  const handleClose = () => {
    setOpen(false)
    setClose(true)
  };
  

  const handleOpen = async () => {
    setOpen(true);
    //setReadTime(ReadTime(postDto.content));
  };
  
  const handleCancel = () => {
    setOpen(false);
  };
  

  const [postDto, setPostDto] = useState({
    title: '',
    content: '',
    read_time: '',
    user_id: userId || user_id, 
    created_date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),    comments: [], // Initialize with an empty array or set as needed
  });

  

  return (
    <>
      <LandingHeader />

      <div className="pub-button">
        <button onClick={handleOpen}>Publish</button>
      </div>
      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <StoryConfirmation  postDto={postDto} onCancel={handleCancel}/>
          </Typography>
        </Box>
      </Modal>
        <input 
          className='titleWrite'
          type="text"
          placeholder='Title'
          value={postDto.title}
          onChange={(e) => setPostDto({ ...postDto, title: e.target.value, read_time: ReadTime(postDto.content) })}

        />

      <div
        style={{
          margin: '10px 0',
          textAlign: 'center',
        }}
      >  
      </div>
      
      <Editor 
        tag="div"
        text={postDto.content}
        onChange={(text) => setPostDto({ ...postDto, content: text })}
        options={{
          toolbar: {
            buttons: [
              'bold',
              'italic',
              'underline',
              'anchor',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'quote',
              'justified',
              'unorderedlist',
              'orderedlist',
              'subscript',
              'superscript',
              'outdent',
              'indent',
              'code',
              'horizontal',
            ],
          },
          placeholder: {
            text: 'Tell  your story...',
          },
          autoLink: true,
          anchor: {
            placeholderText: 'Enter reference link',
          },
          paste: {
            cleanPastedHTML: true,
            cleanAttrs: ['style', 'dir'],
            cleanTags: ['label', 'meta'],
          },
          anchorPreview: {
            hideDelay: 300,
          },
        }}
      />
    </>
  );
};

export default Index;
