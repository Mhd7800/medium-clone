import React, { useState } from 'react';
import "./css/SocialProof.css"

const SocialProof = () => {
  // Define your social proof data
  const socialProofData = [
    {
      avatar: 'https://cdn-static-1.medium.com/sites/medium.com/membership/images/Membership_Coco.png',
      statement: '"For me, the access to a variety of ideas and perspectives is invaluable. Medium brings people from all over into one shared space where we can grow and learn together."',
      name: 'Joseph Coco',
    },
    {
      avatar: 'https://cdn-static-1.medium.com/sites/medium.com/membership/images/Membership_Lowry.png',
      statement: '"My favorite thing about a Medium membership is endlessly reading up-and-coming and well-known writers alike."',
      name: 'T.S. Lowry',
    },
    {
      avatar: 'https://cdn-static-1.medium.com/sites/medium.com/membership/images/Membership_Molina-1.png',
      statement: '"I love Medium’s membership — it gives me access to the stories I love by the writers I love, and it allows me to help support those writers financially."',
      name: 'Kayt Molina',
    },
  ];

  // Initialize state with the first item
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the "Next" button click
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % socialProofData.length);
  };

  const { avatar, statement, name } = socialProofData[currentIndex];

  return (
    <div className="social-proof-container">
      <div className='left'>
      <div className="avatar">
        <img src={avatar} alt={name} />
      </div>
        </div>

        <div className='right'>
        <div className="statement">
        <p>{statement}</p>
        </div>
        <div className="name">
        <p> {name}</p>
        </div>
        <button onClick={handleNextClick}>Next</button>
        </div>  
    </div>
  );
};

export default SocialProof;
