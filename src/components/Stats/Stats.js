import React from 'react'
import LandingHeader from '../LandingPage/LandingHeader'
import AtomicSpinner from 'atomic-spinner'
import './css/Stats.css'

const Stats = () => {
  return (
    <div>
        <>
        <LandingHeader/>
        </>
        <div className='statsPage'>
          <span>Functionality comming soon</span>
          <AtomicSpinner />
        </div>
    </div>
  )
}

export default Stats