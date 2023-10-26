import React from 'react'
import './css/Settings.css'
import LandingHeader from '../LandingPage/LandingHeader'
import Footer from '../footer/Footer'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Account from './Account'
import MemberShipAndPayment from './MemberShipAndPayment'
import Security from './Security'

const Setting = () => {
  return (
    
    <div className='settingsPage'>
            <>
            <LandingHeader/>
            </>
            <div className='settingsContainer'>
                <div className='settingsLeft'>
                  <div className='settingsLeftUpper'>
                    <span>Settings</span>
                  </div>
                  <div className='settingsTabElements'>
                    <Tabs>
                      <TabList>
                        <Tab>
                          Account
                        </Tab>
                        <Tab>
                          Membership and Payment
                        </Tab>
                        <Tab>
                          Security and apps
                        </Tab>
                      </TabList>

                      <TabPanel>
                        <Account/>
                      </TabPanel>
                      <TabPanel>
                        <MemberShipAndPayment/>
                      </TabPanel>
                      <TabPanel>
                        <Security/>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>

                <div className='settinsRight'>
                    <div className='settigsRightUpper'>
                    <h4>Suggested help articles</h4>

                    <span>Sign in or sign up to Medium</span>

                    <span>Your profile page</span>

                    <span>Writing and publishing your first story</span>  

                    <span>About Medium's distribution system</span>

                    <span>Get started with the Partner Program</span>

                    </div>

                    <div className='settingsRightBottom'>
                    <>
                    <Footer/>
                    </>
                    </div>

                    
                </div>
            </div>
    </div>
  )
}

export default Setting