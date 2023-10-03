import React from 'react'
import LandingHeader from '../LandingPage/LandingHeader';
import ListMain from './ListMain';

const Index = ({userDetails})=> {
  return (
    <div>
        <LandingHeader />
        <ListMain userDetails = {userDetails}/>
    </div>
  )
}

export default Index;
