import React from 'react'
import LandingHeader from "./LandingHeader"
import LandingMainPage from "./LandingMainPage"

export default function index({userDetails}) {
  return (
    <div>
      <LandingHeader />
      <main>
        <LandingMainPage userDetails = {userDetails}/>
      </main>
    </div>
  )
}
