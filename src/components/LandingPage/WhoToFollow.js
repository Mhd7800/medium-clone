import { Skeleton } from 'antd';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import LandingRecommendedPost from "./LandingRecommendedPost "
import "./css/LandingMainPage.css"


const WhoToFollow = ({userDetails})=> {

    const [tab, setTab] = useState(0);
    console.log(userDetails);
    const [stories,setStories] = useState();
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);


  return (
    <div className='follow'>
    <h2>Who to follow</h2>
    {users?.map((data) => (
    <WhoToFollow key={data?._id} data={data} />
    ))}
    {[...Array(5)].map((_, idx) => {
    return (
        <>
        {userLoading && (
            <Skeleton key={idx} active avatar paragraph={{ rows: 1 }} />
        )}
        </>
    );
    })}
</div>
  )
}

export default WhoToFollow