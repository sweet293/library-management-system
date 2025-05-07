import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import bookfront2 from "../../assets/website/bookfront2.png"

const Hero = () => {
  return (
    <div className="relative -mt-30">
      <Navbar  />
      {/* Hero Section */}
      <div className="relative mt-0 pt-0">
        <img
          src={bookfront2}
          alt="bookfront"
          className="w-full h-[450px] object-cover"
        />
        
        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-7xl font-merriweather animate-slideUp">
            ...
          </h1>
        </div>
      </div>

      
    </div>
  )
}

export default Hero