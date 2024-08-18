import React, {useEffect, useState}from 'react'
import reactHtmlParser from "react-html-parser";
import getUserInfo from "../getUserInfo"
import axios from 'axios';
import DOMPurify from 'dompurify';
import ReactHTMLparser from "react-html-parser"
import { Link } from 'react-router-dom';



export default function RecommendedPost() {

    const [posts, setPosts] = useState([]);
    //const [author, setAuthor] = useState();
    const [users, setUsers] = useState({});

    useEffect(() => {
        fetchPosts();
    }, []);


    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/posts?pageNo=0&pageSize=6`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data.content);
                // Fetch user details for each post
                data.content.forEach(post => fetchUser(post.user_id));
            } else {
                console.error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchUser = async (userId) => {
        console.log('Fetching user:', userId);
        try {
            const response = await fetch(`http://localhost:8080/api/v1/user/${userId}`);
            if (response.ok) {
                const user = await response.json();
                //console.log('Fetched user:', user);
                setUsers(prevUsers => ({
                    ...prevUsers,
                    [userId]: user
                }));
                console.log('Updated users:', users);
            } else {
                //console.error('Failed to fetch user:', userId);
            }
        } catch (error) {
            //console.error('Error fetching user:', error);
        }
    };
    

    const getFirstTenWords = (content) => {
        // Split the content into words
        const sanitizedContent = DOMPurify.sanitize(content);
        const words = sanitizedContent.split(' ');
        // Select the first 10 words
        const firstTenWords = words.slice(0, 10).join(' ');
        return firstTenWords;
    };

    const getFirstFiveWords = (title) => {
        // Split the content into words

        const words = title.split(' ');
        // Select the first 10 words
        const firstFiveWords = words.slice(0, 5).join(' ');
        return firstFiveWords;
    };

  return (

        <div className='recommended-post-wrapper'>
        <div className='post-wrapper'>
        <div className='post-top'>
        <img src= 'https://firebasestorage.googleapis.com/v0/b/medium-clone-3c1d7.appspot.com/o/images%2Ftrend-up-square-svgrepo-com.png?alt=media&token=e82b211b-32da-4779-8bed-987bc1e6cb00'>
        </img>
        <span>Trending on Medium</span>
        </div>
        <div className='post-container'>

        {posts.length >= 5 ? (
                    posts.map((post, index) => (
                        <div key={index} className='rcm-post-container'>
                            <div className='rcm-post-left'>
                                <span>{index + 1}</span>
                            </div>
                            <div className='rcm-post-right'>
                                <div className='rcm-post-top'>
                                    {users[post.user_id] && <img src={users[post.user_id].photoURL} alt="User"/>}
                                    <span>
                                    <Link to = {`/display/${post.id}`}>{reactHtmlParser(post?.title)}</Link>
                                       </span>
                                </div>
                                <div className='rcm-post-content'>
                                    <span>
                                    <Link to = {`/display/${post.id}`}> {reactHtmlParser(getFirstTenWords(post.content))}</Link>
                                       </span>
                                </div>
                                <div className='rcm-post-footer'>
                                    <span>{post.created_date} | {post.read_time} min read</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Not enough data found</div>
                )}
    </div>
    </div>
    </div>
  )
}
