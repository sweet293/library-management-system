import { useState } from 'react'
import './App.css';
import React from 'react';
import Navbar from '@/components/Navbar/Navbar.jsx';
import Hero from '@/components/Hero/Hero.jsx';


function App() {
  return (
    <div className="library-app">
      <Navbar />
      <Hero />
      
    </div>
  );
}


export default App;
