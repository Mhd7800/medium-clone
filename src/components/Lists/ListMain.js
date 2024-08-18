import React, { useState } from 'react'
import { Skeleton } from "antd";
import Stories from "../MyStories/Stories"
import "./css/ListMain.css"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ListItem from "../Profile/ListItem"
import RecommendedTopic from './RecommendedTopic';
import WhoToFollow from '../LandingPage/WhoToFollow';
import ReadingHistory from './ReadingHistory';
import RightTab from './RightTab';


const ListMain =({userDetails})=> {
  
    console.log(userDetails)
  
    return (
    <div className='story-main'>

      <div className='storyLeft-Component'>
        <div className='list-UpperComponent'>
          <span>Your Library</span>
          <button>New List</button>
        </div>
        <div className='listTabElements'>
        <Tabs>
                    <TabList>
                    <Tab>Your List</Tab>
                    <Tab>Saved List</Tab>
                    <Tab>Reading History</Tab>
                    </TabList>

                    <TabPanel>
                    <ListItem/>
                    </TabPanel>
                    <TabPanel>
                    Saved List
                    </TabPanel>
                    <TabPanel>
                      <ReadingHistory/>
                    </TabPanel>
                </Tabs>
        </div>
      </div>
      <div className='divider'>
        <hr></hr>
      </div>
      <div className='storyRight-Component'>
      <RightTab/>
      </div>
        
    </div>
  )
}

export default ListMain;
