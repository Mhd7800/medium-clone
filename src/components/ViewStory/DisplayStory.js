import React from 'react'
import "./css/displayStory.css"
import { useLoaderData, useParams } from 'react-router-dom'
import axios from 'axios'

const DisplayStory = () => {

  //const { encodedUserName, encodedTitle } = params;
  const display = useLoaderData();

  return (
    <div className='displayStory'>

        <h2> This is the display story </h2> 

        <p>Title : {display.title}</p>

        <p>Content : {display.content} </p>  

    </div>
  )
}

export default DisplayStory;

export const DisplayStoryLoader = async ({params})=> {

  const {encodedTitle} = params

    const title = decodeURIComponent(encodedTitle);

    const res = await fetch(`http://localhost:8080/api/v1/posts/${title}`);
    
    console.log(res.data);
    return res.json();

}