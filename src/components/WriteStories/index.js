import React, { useState } from 'react';
import Editor from 'react-medium-editor';
import LandingHeader from '../LandingPage/LandingHeader';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserId } from '../../features/userIdSlice';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/beagle.css';
import './css/index.css';

const Index = () => {
  const userId = useSelector(selectUserId);

  const [postDto, setPostDto] = useState({
    title: '',
    content: '',
    user_id: userId, 
    comments: [], // Initialize with an empty array or set as needed
    categoryId: null, // Initialize with the appropriate value
  });


  const handleSubmitStory = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/posts', postDto);
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <>
      <LandingHeader />

      <div className="pub-button">
        <button onClick={handleSubmitStory}>Publish</button>
      </div>
      <div
        style={{
          margin: '10px 0',
          textAlign: 'center',
        }}
      >
        <h2>Title of the Story</h2>
        <h2>{userId}</h2>
      </div>

      <label>
        Title:
        <input
          type="text"
          value={postDto.title}
          onChange={(e) => setPostDto({ ...postDto, title: e.target.value })}
        />
      </label>

      <div
        style={{
          margin: '10px 0',
          textAlign: 'center',
        }}
      >
        <h2>Content of the story</h2>
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
            text: 'Write  your story.',
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
