import React from 'react'
import HomeHeader from "../HomePage/HomeHeader"
import Header from '../Header'
import Footer from '../footer/Footer'
import "./index.css"

const index = ()=> {
    
    /*const items = document.querySelectorAll('.accordion button');

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach((item) => item.addEventListener('click', toggleAccordion));*/

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

          <div class="container">
      <h2>Frequently Asked Questions</h2>
      <div class="accordion">
        <div class="accordion-item">
          <button id="accordion-button-1" aria-expanded="false">
            <span class="accordion-title">Why is the moon sometimes out during the day?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
              Ut tortor pretium viverra suspendisse potenti.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-2" aria-expanded="false">
            <span class="accordion-title">Why is the sky blue?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
              Ut tortor pretium viverra suspendisse potenti.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-3" aria-expanded="false">
            <span class="accordion-title">Will we ever discover aliens?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
              Ut tortor pretium viverra suspendisse potenti.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-4" aria-expanded="false">
            <span class="accordion-title">How much does the Earth weigh?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
              Ut tortor pretium viverra suspendisse potenti.
            </p>
          </div>
        </div>
        <div class="accordion-item">
          <button id="accordion-button-5" aria-expanded="false">
            <span class="accordion-title">How do airplanes stay up?</span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
              Ut tortor pretium viverra suspendisse potenti.
            </p>
          </div>
        </div>
      </div>
    </div>
          
    </div>
    <Footer />
    </>
    
  )
}

export default  index;