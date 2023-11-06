import React from 'react'
import Editor from "react-medium-editor";
import LandingHeader from '../LandingPage/LandingHeader'
import { useState } from 'react';
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/beagle.css";
import './css/index.css'
import { selectUserId} from '../../features/userIdSlice';
import {  useGetStoriesQuery,
  useGetUserIdQuery,
  useAddStorieMutation,
  useUpdateUserMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation } from '../../features/api/MyApiSlice';
import { useSelector } from 'react-redux';

const Index = () => {

    
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    
    const userId = useSelector((state) => state.user.userId);
    
    //alert(userId);

    //const [getUserId] = useGetUserIdQuery()
      //const[addStory] = useAddStorieMutation()

    const handleSubmitStory = async () =>{
      //addStory({title,desc})
      
    }


  return (
    <>
    <LandingHeader/>
    
    <div className="pub-button">
        <button onClick={handleSubmitStory}>Publish</button>
      </div>
      <div
        style={{
          margin: "10px 0",
          textAlign: "center",
        }}
      >
        <h2>Title of the Story</h2>
        <h2>{userId}</h2>
      </div>

      <Editor
        tag="pre"
        text={title}
        onChange={(text, medium) => {
          setTitle(text);
          // console.log(medium);
        }}
        options={{
          toolbar: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "anchor",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "quote",
              // "unorderedlist",
              // "orderedlist",
              // "subscript",
              // "superscript",
              "outdent",
              "indent",
              "code",
              "image",
            ],
          },
          placeholder: {
            text: "Write  your story.",
          },

          autoLink: true,
          anchor: {
            placeholderText: "Enter reference link",
            // customClassOption: "btn",
            // customClassOptionText: "Refernce link",
          },
          paste: {
            cleanPastedHTML: true,
            cleanAttrs: ["style", "dir"],
            cleanTags: ["label", "meta"],
          },
          anchorPreview: {
            hideDelay: 300,
          },
        }}
      />
      <div
        style={{
          margin: "10px 0",
          textAlign: "center",
        }}
      >
        <h2>Description of story</h2>
      </div>
      <Editor
        tag="div"
        text={desc}
        onChange={(text) => setDesc(text)}
        options={{
          // extensions: {
          //   embedButton: new EmbedButtonExtension(),
          // },
          toolbar: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "anchor",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "quote",
              "justified",
              "unorderedlist",
              "orderedlist",
              "subscript",
              "superscript",
              "outdent",
              "indent",
              "code",
              "horizontal",
            ],
          },
          placeholder: {
            text: "Write  your story.",
          },

          autoLink: true,
          anchor: {
            placeholderText: "Enter reference link",
            // customClassOption: "btn",
            // customClassOptionText: "Refernce link",
          },
          paste: {
            cleanPastedHTML: true,
            cleanAttrs: ["style", "dir"],
            cleanTags: ["label", "meta"],
          },
          anchorPreview: {
            hideDelay: 300,
          },
        }}
      />

    </>
    
  )
}

export default Index

