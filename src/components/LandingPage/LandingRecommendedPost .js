import React from 'react'
import { Tooltip } from "antd";
import { truncate } from './WhoToFollow'
import moment from "moment";
import "./css/LandingRecommendedPost.css"
import reactHtmlParser from "react-html-parser";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LandingRecommendedPost ({ data, userDetails }) {


  const navigate = useNavigate()
  const userId = userDetails?.id
  //const postId = data?.id
  
  const addToList = async(postId) => {
    axios.post(`/api/users/${userId}/addPostToList/${postId}`)
    .then(response => {
        console.log(response.data);
        // Handle success (e.g., show a success message)
    })
    .catch(error => {
        console.error(error);
        // Handle error (e.g., show an error message)
    });
  }


  return (
    <div>LandingRecommendedPost </div>
  )
}
