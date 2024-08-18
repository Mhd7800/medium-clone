import React, { useState } from 'react'
import "./css/index.css"

const  Index =()=> {

  const [Selected, setSelected] = useState(null);
  
  const toggle = i =>{
      if (Selected== i)
      {
        return setSelected(null);
      }
      setSelected(i);
  }

  return (
    <div className='faq-accordion'>
      <h2>FAQ</h2>
      <div className='accordion'>
        {data.map((item,i)=>(
          <div className='faq-item'>
            <div className='faq-title' onClick={()=>toggle(i)}>
              <h3>{item.question}</h3>
              <span>{Selected === i ? '-' : '+'}</span>
            </div>
              <div className={Selected === i ? 'content show' : 'content'}>
                <p>{item.answer}</p>
            </div> 
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index;

const data = [
  {
    question: 'What are the new changes for the Partner Program?',
    answer:
    `We’ve updated the Partner Program to incentivize high-quality human writing. Here’s a quick summary: we’ve opened up the Partner Program to more locations, removed the 100 follower requirement, and require Medium membership to join. Earnings will be higher for stories that have repeat readers, have been Boosted, and that have a high read ratio. All stories will also earn more based on engagement signals like claps, highlights, and replies. Referral bonuses are being deprecated and new story stats will be added in so writers can better understand their story earnings breakdown.

    Read more about all of the changes and our vision for the Partner Program.
    `

  },
  {
    question : 'What are the eligibility requirements to join the Partner Program?',
    answer: `To join the Partner Program, you will need to meet the following eligibility requirements:

    Be a Medium member
    1.Have published at least one story on Medium in the past 6 months
    2.Are located in a supported country
    3.Are 18 years of age or older
    4.Check out the eligibility requirements and details about the Partner Program.
    `

  },
  {
    question : 'How are earnings calculated?',
    answer: `Earnings will be based on member read and listen time as well as member engagement signals. This includes claps, highlights, replies, and new follows. Reads and read ratios will be defined as people who read your story for 30 seconds or more divided by total views. More information on how earnings are calculated can be found here with examples featured here.`
  },
  {
    question : 'What is happening with referred memberships?',
    answer: `We’re deprecating the Membership Referral Program and replacing it with a Follower Bonus. Stories that are read by and have engagement with existing followers will get an extra bonus in earnings.

    All member referrals made up until September 1, 2023 will continue to be honored indefinitely. We will keep your custom referral pages up so that they don’t break your links in stories, but we will stop generating new referrals for members who sign up after September 1st.`
  },
  {
    question : 'Do existing Partner Program writers need to re-apply or update anything at this time?',
    answer: `Nope, if you’re already in the Partner Program, you won’t have to do anything new to stay in the program.`
  },
  {
    question : 'Where can I go if I have more questions about the Partner Program?',
    answer: `Check out the Partner Program Guide! If you have any other questions, submit a Help Desk request and we’ll get back to you as soon as possible!`
  }
]