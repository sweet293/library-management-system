import { useState } from 'react'
import './App.css';
import React from 'react';
import Navbar from '@/components/Navbar/Navbar.jsx';
import Hero from '@/components/Hero/Hero.jsx';
import BookSection from '@/components/BookSection/BookSection.jsx';

function App() {
  return (
    <div className="library-app">
      <Navbar />
      <Hero />
      <div className="min-h-screen bg-gray-100 overflow-auto">
        <BookSection
        sectionTitle="Library Collection"
        sectionDescription="Filter by genre or search for your favorite titles."
        />
      </div>
    </div>
  );
}

export default App;
