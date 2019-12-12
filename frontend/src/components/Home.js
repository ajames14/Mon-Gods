import React from 'react'
import LazyHero from 'react-lazy-hero'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import CountrySearch from './CountrySearch'
import SurfMap from './SurfMap'

const Home = () => (
  <React.Fragment>
    <div>
      <section id='home-page'>
        <LazyHero imageSrc="https://i.pinimg.com/originals/18/92/17/18921735a859b696c412f59c8ce5e220.jpg" minHeight='100vh' parallaxOffset={100} overflow='hidden' opacity={0} id='lazy-home' transitionDuration={0}>
          <div id='titles'>
            <h1>Swell</h1>
            <h2>Find your Favourite Surf Spot</h2>
            <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >
              <button id='search' className='button'>Start Searching</button>
            </Link>
          </div>
        </LazyHero>
      </section>
      <section className='hero is-fullheight'>
        <div className='hero-body'>
          <div className="section">
            <CountrySearch className="column" />
            <SurfMap className="column" />
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1455729552865-3658a5d39692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"/>
      </section>
    </div>
  </React.Fragment>
)



export default Home


