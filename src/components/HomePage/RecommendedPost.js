import React, {useEffect, useState}from 'react'
import ReactHTMLparser from "react-html-parser";



export default function RecommendedPost() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/posts?pageNo=0&pageSize=6`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data.content); 
            } else {
                console.error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const getFirstTenWords = (content) => {
        // Split the content into words
        const words = content.split(' ');
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
        <img src='https://firebasestorage.googleapis.com/v0/b/medium-clone-3c1d7.appspot.com/o/images%2Ftrend-up-square-svgrepo-com.png?alt=media&token=e82b211b-32da-4779-8bed-987bc1e6cb00'>
        </img>
        <span>Trending on Medium</span>
        </div>
        <div className='post-container'>

            {posts.map((post, index)=>(

            
            <div key={index} className='rcm-post-container'>
                        <div className='rcm-post-left'>
                            <span>
                              {index+1}
                            </span>
                        </div>
                        <div className='rcm-post-right'>
                        <div className='rcm-post-top'>
                        <img src="https://cdn-images-1.medium.com/fit/c/45/45/1*OdaLifs02To5Yibe8Pgrwg.png" class="avatar-image u-size36x36 u-xs-size32x32" alt="Go to the profile of The Bold Italic">
                            </img>
                            <span>{getFirstFiveWords(post.title)}</span>
                        </div>
                        <div className='rcm-post-content'>
                        <span>{ReactHTMLparser(getFirstTenWords(post.content))}</span>
                        </div>
                        <div className='rcm-post-footer'>
                            <span>{post.created_date} | {post.read_time} min read</span>
                        </div>
                    </div>
                </div>
                ))}
                {/*<div className='rcm-post-container'>
                        <div className='rcm-post-left'>
                            <span>
                               01
                            </span>
                        </div>
                        <div className='rcm-post-right'>
                        <div className='rcm-post-top'>
                        <img src="https://cdn-images-1.medium.com/fit/c/45/45/1*OdaLifs02To5Yibe8Pgrwg.png" class="avatar-image u-size36x36 u-xs-size32x32" alt="Go to the profile of The Bold Italic">
                            </img>
                            <span>The Bold Italic</span>
                        </div>
                        <div className='rcm-post-content'>
                            <span>The real crime in San Francisco: Fashion</span>
                        </div>
                        <div className='rcm-post-footer'>
                            <span>21.09.2023 | 2 min read</span>
                        </div>
                    </div>
                </div>
                <div className='rcm-post-container'>
                        <div className='rcm-post-left'>
                            <span>
                               01
                            </span>
                        </div>
                        <div className='rcm-post-right'>
                        <div className='rcm-post-top'>
                        <img src="https://cdn-images-1.medium.com/fit/c/45/45/1*OdaLifs02To5Yibe8Pgrwg.png" class="avatar-image u-size36x36 u-xs-size32x32" alt="Go to the profile of The Bold Italic">
                            </img>
                            <span>The Bold Italic</span>
                        </div>
                        <div className='rcm-post-content'>
                            <span>The real crime in San Francisco: Fashion</span>
                        </div>
                        <div className='rcm-post-footer'>
                            <span>21.09.2023 | 2 min read</span>
                        </div>
                    </div>
                </div>
                <div className='rcm-post-container'>
                        <div className='rcm-post-left'>
                            <span>
                               01
                            </span>
                        </div>
                        <div className='rcm-post-right'>
                        <div className='rcm-post-top'>
                        <img src="https://cdn-images-1.medium.com/fit/c/45/45/1*OdaLifs02To5Yibe8Pgrwg.png" class="avatar-image u-size36x36 u-xs-size32x32" alt="Go to the profile of The Bold Italic">
                            </img>
                            <span>The Bold Italic</span>
                        </div>
                        <div className='rcm-post-content'>
                            <span>The real crime in San Francisco: Fashion</span>
                        </div>
                        <div className='rcm-post-footer'>
                            <span>21.09.2023 | 2 min read</span>
                        </div>
                    </div>
                </div>
                <div className='rcm-post-container'>
                        <div className='rcm-post-left'>
                            <span>
                               01
                            </span>
                        </div>
                        <div className='rcm-post-right'>
                        <div className='rcm-post-top'>
                        <img src="https://cdn-images-1.medium.com/fit/c/45/45/1*OdaLifs02To5Yibe8Pgrwg.png" class="avatar-image u-size36x36 u-xs-size32x32" alt="Go to the profile of The Bold Italic">
                            </img>
                            <span>The Bold Italic</span>
                        </div>
                        <div className='rcm-post-content'>
                            <span>The real crime in San Francisco: Fashion</span>
                        </div>
                        <div className='rcm-post-footer'>
                            <span>21.09.2023 | 2 min read</span>
                        </div>
                    </div>
  </div>*/}

    </div>
    </div>
    </div>
  )
}
