import { useState } from 'react'
import './App.css';
import React from 'react';
import Navbar from '@/components/Navbar/Navbar.jsx';
import Hero from '@/components/Hero/Hero.jsx';
import BookSection from '@/components/BookSection/BookSection.jsx';
import lines from "./assets/website/lines.jpg"


function App() {
  return (
    <div className="library-app">
      <Navbar />
      <div className="relative -mt-20 bg-cover bg-fixed" style={{ backgroundImage: `url(${lines})` }}>

      <Hero />
      <div className="min-h-screen bg-gray-100 overflow-auto">
        <BookSection
        />
      </div>
    </div>
    </div>
  );
}

export default App;
