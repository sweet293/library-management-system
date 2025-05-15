import { useState } from 'react';
import { Search, Book, Calendar, Info, User, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({toggleDarkMode, darkMode}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = ( {darkMode}) => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  return (
    <nav className={`bg-[#641B2E] text-[#FBDB93] shadow-lg mx-auto fixed top-0 left-0 right-0 z-10 items-center
    `}>
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex flex-wrap justify-between items-center h-16 gap-x-4">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="flex items-center">
                <Book className="h-8 w-8 mr-2" />
                <span className="font-bold text-xl">City Library</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-3 mx-6">
            <a href="#catalog" className="!text-[#FBDB93] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#8A2B42] flex">
              <Book className="h-4 w-4 mr-1" />
              Catalog
            </a>
            <a href="#events" className="!text-[#FBDB93] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#8A2B42] flex">
              <Calendar className="h-4 w-4 mr-1" />
              Events
            </a>
            <a href="#services" className="!text-[#FBDB93] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#8A2B42] flex">
              <Info className="h-4 w-4 mr-1" />
              Services
            </a>
            <a href="#about" className="!text-[#FBDB93] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#8A2B42] flex">
              <Info className="h-4 w-4 mr-1" />
              About
            </a>
          </div>

          {/* Search and Account */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search catalog..."
                className="bg-[#8A2B42] rounded-full pl-10 pr-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBDB93]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#FBDB93]" />
            </div>
            <a href="#account" className="!text-[#FBDB93] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#8A2B42] flex items-center">
              <User className="h-4 w-4 mr-1" />
              My Account
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#FBDB93] hover:text-white hover:bg-[#8A2B42] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
              {/* Toggle Dark Mode Button */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-[#FBDB93] p-2 rounded-md">
              {darkMode ? (
                <Sun className='h-6s w-6'/>
              ) : (
                <Moon className = 'h-6 w-6'/>
              )
            }
            </button>

          </div>
        </div>
        
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#641B2E]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="relative mb-3 px-3">
              <input
                type="text"
                placeholder="Search catalog..."
                className="w-full bg-[#8A2B42] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBDB93]"
              />
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#FBDB93]" />
            </div>
          </div>
        </div>
      )}


      
    </nav>
  );
}