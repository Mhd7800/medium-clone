import React from 'react'
import RightTab from '../Lists/RightTab'
import './css/Stories.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReadingHistory from '../Lists/ReadingHistory';
import Drafts from './Drafts';
import Published from './Published';
import { Link } from 'react-router-dom';

const Stories = () => {
  return (
    <div className='stories-wrapper'>
        <div className='stories-left'>

        <div className='stories-UpperComponent'>
          <span>Your Stories</span>
          <Link to={"/new-story"}>
          <button>Write a Story</button>
          </Link>
        </div>

        <div className='listTabElements'>
        <Tabs>
                    <TabList>
                    <Tab>Drafts</Tab>
                    <Tab>Published</Tab>
                    <Tab>Responses</Tab>
                    </TabList>

                    <TabPanel>
                    <Drafts />
                    </TabPanel>

                    <TabPanel>
                    <Published/>
                    </TabPanel>
                    <TabPanel>
                     
                    </TabPanel>
                </Tabs>
        </div>

        </div>

        <div className='stories-right'>
            <RightTab/>
        </div>
        
    </div>
  )
}

export default Stories