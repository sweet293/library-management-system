import { useState } from 'react';
import { Search, Book, Calendar, Info, User, Menu, X, Sun, Moon, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';
import AuthModal from '../Auth/AuthModal';

export default function Navbar({ toggleDarkMode, darkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className={`bg-[#641B2E] text-[#FBDB93] shadow-lg mx-auto fixed top-0 left-0 right-0 z-10 items-center`}>
        {/* Desktop Navbar */}
        <div className="max-w-7xl mx-auto px-4">
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
              {/* Admin-only links */}
              {isAdmin() && (
                <a href="#admin" className="!text-[#FBDB93] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#8A2B42] flex">
                  <Settings className="h-4 w-4 mr-1" />
                  Admin Panel
                </a>
              )}
            </div>

            {/* Search and Account */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search catalog..."
                  className="bg-[#8A2B42] text-[#FBDB93] placeholder-[#FBDB93] rounded-full pl-10 pr-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBDB93]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#FBDB93]" />
              </div>

              {/* User Account Section */}
              {isAuthenticated() ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="!text-[#FBDB93] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#8A2B42] flex items-center"
                  >
                    <User className="h-4 w-4 mr-1" />
                    {user?.username}
                    {isAdmin() && (
                      <span className="ml-2 bg-[#FBDB93] text-[#641B2E] px-2 py-0.5 rounded text-xs font-bold">
                        ADMIN
                      </span>
                    )}
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <div className="font-medium">{user?.username}</div>
                        <div className="text-gray-500">{user?.email}</div>
                        <div className="text-xs text-gray-400 capitalize">{user?.role}</div>
                      </div>
                      <a
                        href="#profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </a>
                      <a
                        href="#borrowed"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Borrowed Books
                      </a>
                      {isAdmin() && (
                        <a
                          href="#admin-dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Admin Dashboard
                        </a>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="inline h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="!text-[#FBDB93] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#8A2B42] flex items-center"
                >
                  <User className="h-4 w-4 mr-1" />
                  Sign In
                </button>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-4">
              <button onClick={toggleDarkMode} className="text-[#FBDB93] p-2 rounded-md hover:bg-[#8A2B42]">
                {darkMode ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>
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
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#641B2E] border-t border-[#8A2B42]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-3 px-3">
                <input
                  type="text"
                  placeholder="Search catalog..."
                  className="w-full bg-[#8A2B42] text-[#FBDB93] placeholder-[#FBDB93] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBDB93]"
                />
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#FBDB93]" />
              </div>

              {/* Mobile Navigation Links */}
              <a href="#catalog" className="text-[#FBDB93] hover:bg-[#8A2B42] block px-3 py-2 rounded-md text-base font-medium">
                <Book className="inline h-4 w-4 mr-2" />
                Catalog
              </a>
              <a href="#events" className="text-[#FBDB93] hover:bg-[#8A2B42] block px-3 py-2 rounded-md text-base font-medium">
                <Calendar className="inline h-4 w-4 mr-2" />
                Events
              </a>
              <a href="#services" className="text-[#FBDB93] hover:bg-[#8A2B42] block px-3 py-2 rounded-md text-base font-medium">
                <Info className="inline h-4 w-4 mr-2" />
                Services
              </a>
              <a href="#about" className="text-[#FBDB93] hover:bg-[#8A2B42] block px-3 py-2 rounded-md text-base font-medium">
                <Info className="inline h-4 w-4 mr-2" />
                About
              </a>

              {/* Admin links for mobile */}
              {isAdmin() && (
                <a href="#admin" className="text-[#FBDB93] hover:bg-[#8A2B42] block px-3 py-2 rounded-md text-base font-medium">
                  <Settings className="inline h-4 w-4 mr-2" />
                  Admin Panel
                </a>
              )}

              {/* Mobile Auth Section */}
              <div className="border-t border-[#8A2B42] pt-3 mt-3">
                {isAuthenticated() ? (
                  <>
                    <div className="px-3 py-2 text-[#FBDB93]">
                      <div className="font-medium">{user?.username}</div>
                      <div className="text-sm text-[#FBDB93] opacity-75">{user?.email}</div>
                      {isAdmin() && (
                        <span className="inline-block mt-1 bg-[#FBDB93] text-[#641B2E] px-2 py-0.5 rounded text-xs font-bold">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <a href="#profile" className="text-[#FBDB93] hover:bg-[#8A2B42] block px-3 py-2 rounded-md text-base font-medium">
                      <User className="inline h-4 w-4 mr-2" />
                      My Profile
                    </a>
                    <a href="#borrowed" className="text-[#FBDB93] hover:bg-[#8A2B42] block px-3 py-2 rounded-md text-base font-medium">
                      <Book className="inline h-4 w-4 mr-2" />
                      Borrowed Books
                    </a>
                    <button
                      onClick={handleLogout}
                      className="text-[#FBDB93] hover:bg-[#8A2B42] block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                    >
                      <LogOut className="inline h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={openAuthModal}
                    className="text-[#FBDB93] hover:bg-[#8A2B42] block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  >
                    <User className="inline h-4 w-4 mr-2" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        darkMode={darkMode}
      />
    </>
  );
}