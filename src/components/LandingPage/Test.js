import React, {useEffect, useState} from 'react'
import axios from 'axios';

const Test = () => {

    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);


    /*useEffect(() => {
        async function getStories() {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/posts");
                setLoading(false);
                setStories(response.data.data);
                //setStories(response.data.data?.slice(0, 10));
                console.log('Fetched stories:', JSON.stringify(stories, null, 2));
    
            } catch (err) {
                console.log(err.response.data.message);
                setLoading(false);
            }
        }
        getStories();  
    }, []);*/



  /*useEffect(() => {
    const getStories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/posts/`);
        const stories = await response.json();
        console.log(stories)
        setStories(stories)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    getStories();
  }, []);*/
  
  useEffect(() => {
    const getStories = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/posts?pageNo=1&pageSize=10&sortBy=title&sortDir=asc`
        );
        const fetchedStories = await response.json();
        console.log('Fetched Stories:', fetchedStories); 
        setStories(fetchedStories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    getStories();
  }, []);
  
  

  return (
    <div>
      Hi
    </div>
  )
}

export default Test