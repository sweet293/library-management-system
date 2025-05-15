import { useState, useEffect } from 'react'
import './App.css';
import React from 'react';
import Navbar from '@/components/Navbar/Navbar.jsx';
import Hero from '@/components/Hero/Hero.jsx';
import BookSection from '@/components/BookSection/BookSection.jsx';
import lines from "./assets/website/lines.jpg"
import darklines from "./assets/website/darklines.png"



function App() {
  const [darkMode, setDarkMode] = useState(() =>{
    const dark = localStorage.getItem('dark');
    return dark !== null ? JSON.parse(dark) : false;
  })

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundImage = `url(${darklines})`;
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundImage = `url(${lines})`;
    }
  }, [darkMode])

  useEffect(() => {
    window.localStorage.setItem('dark', JSON.stringify(darkMode))
  },[darkMode])

  return (
    <div className="library-app">
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className={`relative -mt-20 bg-cover bg-fixed ${darkMode ? 'bg-dark' : 'bg-light'}`} 
        style={{ backgroundImage: `url(${darkMode ? darklines : lines})` }}>
        
        <Hero darkMode={darkMode}/>

        <div className={`min-h-screen bg-gray-100 overflow-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
          <BookSection darkMode={darkMode}/>
        </div>
      </div>
    </div>
  );
}

export default App;
