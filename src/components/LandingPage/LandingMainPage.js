import { Skeleton } from 'antd';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import LandingRecommendedPost from "./LandingRecommendedPost "
import WhoToFollow from "./WhoToFollow"
import "./css/LandingMainPage.css"


const LandingMainPage = ({userDetails}) => {
  
    const [tab, setTab] = useState(0);
    //console.log(userDetails);
    const [stories,setStories] = useState();
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);

  
    return (
    <div className='landing-main'>
        <div className='landing-main-container'>
            <div className='landing-main-left'>
                <div className='landing-main-tabs'>
                    <div onClick={()=> setTab(0)}
                        className='{`tab ${tab === 0 && "active"}`}'
                    >
                        <span>
                            FOLLOWING
                        </span>
                    <div onClick={()=> setTab(1)} 
                    className={`tab ${tab === 1 && "active"}`}
                    >
                        <span>RECOMMENDED FOR YOU</span>
                    </div>
                    </div>
                    <div className='landing-write-story'>
                        <h6>Share your history with millions of readers</h6>
                        <Link to="/new-story">
                            <button>Write on Medium</button>
                        </Link>
                    </div>
                    {tab === 0 && (
                        <>
                            {users?.map((data)=>
                            (<WhoToFollow key={data?._id} data={data} />)
                            )}
                        </>
                    )}
                    {tab === 1 && (
                        <div className='landing-recommended-posts'>
                            {[...Array(10)].map((_,index)=>{
                                return (
                                    <>
                                        {loading && (
                                            <Skeleton.Button 
                                            key={index}
                                            style={{
                                                margin:"10px 0",
                                            }}
                                            active = {true}
                                            size={'large'}
                                            shape={"default"}
                                            block={true}
                                            />
                                        )}
                                    </>
                                )
                            })} 
                            {stories?.map((data)=>(
                                <LandingRecommendedPost userDetails={userDetails} key={data?._id} data={data}/>
                            ))}   
                        </div>
                    )}
                </div>
                <div className='landing-main-right'>
                    <div className='recommended-topics'>
                        <h2>Recommended topics</h2>
                        <div className='topic'>
                            <span>Technology</span>
                            <span>Money</span>
                            <span>Business</span>
                            <span>Productivity</span>
                            <span>Pychology</span>
                            <span>Art</span>
                        </div>
                    </div>
                   <WhoToFollow/>
                </div>
            </div>
        </div>
    </div>
  )
}


export default  LandingMainPage