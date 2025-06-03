import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import { AuthProvider } from './components/Auth/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import BookSection from './components/BookSection/BookSection';
import lines from "./assets/website/lines.jpg";
import darklines from "./assets/website/darklines.png";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Try to get dark mode preference from localStorage, default to false
    try {
      const dark = localStorage.getItem('dark');
      return dark !== null ? JSON.parse(dark) : false;
    } catch (error) {
      console.error('Error reading dark mode from localStorage:', error);
      return false;
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Apply dark mode styles to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundImage = `url(${darklines})`;
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundImage = `url(${lines})`;
    }
  }, [darkMode]);

  // Save dark mode preference
  useEffect(() => {
    try {
      localStorage.setItem('dark', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Error saving dark mode to localStorage:', error);
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <div className="library-app">
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        
        <div 
          className={`relative -mt-20 bg-cover bg-fixed ${darkMode ? 'bg-dark' : 'bg-light'}`}
          style={{ backgroundImage: `url(${darkMode ? darklines : lines})` }}
        >
          <Hero darkMode={darkMode} />
          
          <div className={`min-h-screen overflow-auto transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
          }`}>
            <BookSection 
              sectionTitle="Discover Our Collection"
              sectionDescription="Explore thousands of books across various genres"
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;