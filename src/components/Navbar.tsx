import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavClick(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-darker/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-orbitron font-bold text-primary-light">
            FanVerse
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('about')}
              className="text-gray-300 hover:text-primary-light transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-gray-300 hover:text-primary-light transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className="text-gray-300 hover:text-primary-light transition-colors"
            >
              Community
            </button>
            <button
              onClick={() => handleNavClick('marketplace')}
              className="text-gray-300 hover:text-primary-light transition-colors"
            >
              Marketplace
            </button>
            <Link
              to="/signin"
              className="px-4 py-2 text-primary-light hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-primary-light transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick('about')}
                className="text-gray-300 hover:text-primary-light transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick('features')}
                className="text-gray-300 hover:text-primary-light transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick('community')}
                className="text-gray-300 hover:text-primary-light transition-colors"
              >
                Community
              </button>
              <button
                onClick={() => handleNavClick('marketplace')}
                className="text-gray-300 hover:text-primary-light transition-colors"
              >
                Marketplace
              </button>
              <Link
                to="/signin"
                className="text-primary-light hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-primary-light hover:text-white transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;