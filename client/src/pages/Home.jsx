import React from 'react'
import Banner from '../Component/home/Banner'
import Hero from '../Component/home/Hero'
import Feature from '../Component/home/Feature'
import Testimonial from '../Component/home/Testimonial'
import CallToAction from '../Component/home/CallToAction'
import Footer from '../Component/home/Footer'
import Process from '../Component/home/Process'

const Home = () => {
  return (
     <div className="relative min-h-screen bg-[#FBFAF6]">

  {/* Continuous document margin line */}
  <div
    className="hidden md:block absolute top-0 bottom-0 left-16 w-px bg-[#DFDACC] pointer-events-none z-0"
  />
        <Banner/>
        <Hero/>
        <Process/>
        <Feature/>
        <Testimonial/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default Home