import React from 'react'
import HomeHeader from "../HomePage/HomeHeader"
import Header from '../Header'
import Footer from '../footer/Footer'
import "./index.css"

import Accordion from '../Accordion'

const index = ()=> {
    
  return (
    <>
        <Header/>
    <div className='write'>
        <div className='write-top-content'>
            <h1>Medium Partner <br></br> Program</h1>
            <p>Medium’s Partner Program is for people who are interested in helping us fulfill our mission of deepening the collective wisdom of the world through personal expression, knowledge-sharing, and storytelling.</p>
            <button>Apply now</button>
        </div>
        <div className='upper-middle-content'>
            <div className='left-upper'>
                <h2>Quality over clickbait</h2>
                <p>
                In a creator economy ruled by clickbait and ad impressions, Medium’s Partner Program is taking a stand for quality. As a partner, when your best stories are read by Medium members, a portion of their membership dues will be shared with you. Here are a few factors we consider in order to determine quality. 
                </p>
            </div>
            <div className='right-upper'>
                <div className='first'>
                    <h4>Member read time</h4>
                    <p>Members-only stories will earn money when a member reads your story for 30 seconds or more, and will continue to earn more the longer they keep reading. Long, thoughtful, reads are encouraged!</p>
                </div>
                <div className='second'>
                    <h4>Positive interactions</h4>
                    <p>You’ll also earn more when members clap, highlight, reply, or engage with your story in other ways.</p>
                </div>
                <div className='third'>
                    <h4>Follower bonus</h4>
                    <p>When members follow you and continue to read and interact with your stories, you will be given a follower bonus. We encourage writers to share their stories with readers in a way that promotes community and audience building.</p>
                </div>
                <div className='fourth'>
                    <h4>Boost bonus</h4>
                    <p>Stories that are Boosted will also earn more for each read and interaction. We recommend that writers spend more time on fewer, high-quality stories to reach this bar.</p>
                </div>
            </div>
        </div>
        <div className='middle-content'>
            <div className='left-middle'>
                <h2>Eligibility criteria</h2>
            </div>
            <div className='right-middle'>
                <div className='first'>
                    <h4>You’re a member.</h4>
                    <p>The best way to succeed as a Partner Program author is to also participate as a reader of stories on Medium.</p>
                </div>
                <div className='second'>
                    <h4>You’ve published a story in the last 6 months.</h4>
                    <p>Staying active, publishing regularly, and being engaged with the community are important ways to help our platform flourish.</p>
                </div>
                <div className='third'>
                    <h4>You’re located in an eligible country.</h4>
                    <p>We recently expanded the number of supported countries, so now more people than ever are able to join the Partner Program.</p>
                </div>
            </div>
        </div>
        <div className='write-bottom-button'>
            <button>Apply now
            <span>→</span>
            </button>
            </div>

          {/*<div class="container">
      
      <div class="accordion">
      <h2>FAQ</h2>
        <div class="accordion-item">
          <button id="accordion-button-1" aria-expanded="false">
            <span class="accordion-title">What are the new changes for the Partner Program?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
            We’ve updated the Partner Program to incentivize high-quality human writing. Here’s a quick summary: we’ve opened up the Partner Program to more locations, removed the 100 follower requirement, and require Medium membership to join. Earnings will be higher for stories that have repeat readers, have been Boosted, and that have a high read ratio. All stories will also earn more based on engagement signals like claps, highlights, and replies. Referral bonuses are being deprecated and new story stats will be added in so writers can better understand their story earnings breakdown.

            <a src="https://blog.medium.com/new-partner-program-incentives-focus-on-high-quality-human-writing-7335f8557f6e">Read more about all of the changes and our vision for the Partner Program.</a>

            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-2" aria-expanded="false">
            <span class="accordion-title">What are the eligibility requirements to join the Partner Program?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
            To join the Partner Program, you will need to meet the following eligibility requirements:

            1.Be a Medium member
            2.Have published at least one story on Medium in the past 6 months
            3.Are located in a supported country
            4.Are 18 years of age or older
            <a src="https://help.medium.com/hc/en-us/articles/115011694187-Getting-started-with-the-Partner-Program">Check out the eligibility requirements and details about the Partner Program.</a>
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-3" aria-expanded="false">
            <span class="accordion-title">How are earnings calculated?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
            Earnings will be based on member read and listen time as well as member engagement signals. This includes claps, highlights, replies, and new follows. Reads and read ratios will be defined as people who read your story for 30 seconds or more divided by total views. More information on how earnings are calculated can be found <a src="https://help.medium.com/hc/en-us/articles/16030675401879-How-stories-earn-in-the-new-Partner-Program">here</a> with examples featured <a src="https://help.medium.com/hc/en-us/articles/360036691193">here</a>.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-4" aria-expanded="false">
            <span class="accordion-title">What is happening with referred memberships?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
            We’re deprecating the Membership Referral Program and replacing it with a Follower Bonus. Stories that are read by and have engagement with existing followers will get an extra bonus in earnings.

All member referrals made up until September 1, 2023 will continue to be honored indefinitely. We will keep your custom referral pages up so that they don’t break your links in stories, but we will stop generating new referrals for members who sign up after September 1st.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-5" aria-expanded="false">
            <span class="accordion-title">Do existing Partner Program writers need to re-apply or update anything at this time?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
            Nope, if you’re already in the Partner Program, you won’t have to do anything new to stay in the program.
            </p>
          </div>
        </div>

        <div class="accordion-item">
          <button id="accordion-button-6" aria-expanded="false">
            <span class="accordion-title">Where can I go if I have more questions about the Partner Program?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
            Check out the Partner <a src="https://help.medium.com/hc/en-us/articles/115011694187-Getting-started-with-the-Partner-Program">Program Guide!</a> If you have any other questions, submit a <a src="https://help.medium.com/hc/en-us/requests/new">Help Desk</a> request and we’ll get back to you as soon as possible!
            </p>
          </div>
        </div>
      </div>
  </div>*/}


    <Accordion />
    
    </div>
    <Footer />
    </>
    
  )
}

export default  index;