import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import bookfront2 from "../../assets/website/bookfront2.png"
import lines from "../../assets/website/lines.jpg"


const Hero = () => {
  return (
    <div className="relative -mt-20 bg-cover bg-fixed" style={{ backgroundImage: `url(${lines})` }}>
      
      {/* Hero Section */}
      <div className="relative mt-0 pt-0">
        <img
          src={bookfront2}
          alt="bookfront"
          className="w-full h-[450px] object-cover"
        />
        
        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-gray-900 text-4xl md:text-7xl font-medium tracking-wide animate-slideUp">
            Alexandria's Library
          </h1>
        </div>
      </div>

      
    </div>
  )
}

export default Hero