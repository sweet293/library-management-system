import { useState } from 'react';
import { Search, Book, Calendar, Info, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  return (
    <nav className="bg-[#D4C9BE] text-white shadow-lg mx-auto fixed top-0 left-0 right-0 z-10">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
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
          <div className="hidden md:flex items-center space-x-4">
            <a href="#catalog" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#123458] flex items-center">
              <Book className="h-4 w-4 mr-1" />
              Catalog
            </a>
            <a href="#events" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#123458] flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Events
            </a>
            <a href="#services" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#123458] flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Services
            </a>
            <a href="#about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#123458] flex items-center">
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
                className="bg-[#123458] rounded-full pl-10 pr-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-300" />
            </div>
            <a href="#account" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#123458] flex items-center">
              <User className="h-4 w-4 mr-1" />
              My Account
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="relative mb-3 px-3">
              <input
                type="text"
                placeholder="Search catalog..."
                className="w-full bg-indigo-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-300" />
            </div>
            <a
              href="#catalog"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 flex-items-center"
            >
              <Book className="h-5 w-5 mr-2" />
              Catalog
            </a>
            <a
              href="#events"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 flex-items-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Events
            </a>
            <a
              href="#services"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 flex-items-center"
            >
              <Info className="h-5 w-5 mr-2" />
              Services
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 flex-items-center"
            >
              <Info className="h-5 w-5 mr-2" />
              About
            </a>
            <a
              href="#account"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 flex-items-center"
            >
              <User className="h-5 w-5 mr-2" />
              My Account
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}