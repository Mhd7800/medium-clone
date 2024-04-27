import React from 'react'
import LandingHeader from "./LandingHeader"
import LandingMainPage from "./LandingMainPage"

export default function index() {
  return (
    <div>
      <LandingHeader />
      <main>
        <LandingMainPage/>
      </main>
    </div>
  )
}
