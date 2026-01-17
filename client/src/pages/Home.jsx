import React from 'react'
import Banner from '../Component/home/Banner'
import Hero from '../Component/home/Hero'
import Feature from '../Component/home/Feature'
import Testimonial from '../Component/home/Testimonial'
import CallToAction from '../Component/home/CallToAction'
import Footer from '../Component/home/Footer'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Hero/>
        <Feature/>
        <Testimonial/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default Home