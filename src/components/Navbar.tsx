import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-darker bg-opacity-90 backdrop-blur-md py-2 shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary-light animate-pulse" />
            <span className="text-2xl font-orbitron font-bold text-white">
              FanVerse
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Community
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Marketplace
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <button className="btn-secondary">Sign In</button>
              <button className="btn-primary">Sign Up</button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              className="text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card mt-2 mx-4 p-4">
          <div className="flex flex-col space-y-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Community
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Marketplace
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700">
              <button className="btn-secondary w-full">Sign In</button>
              <button className="btn-primary w-full">Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;