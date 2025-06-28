import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Sparkles } from 'lucide-react';

interface NavbarProps {
  onSectionClick: (section: number) => void;
  currentSection: number;
  onAuthClick: (mode: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, onSectionClick, onAuthClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', index: 0 },
    { name: 'About', index: 1 },
    { name: 'Features', index: 2 },
    { name: 'Community', index: 3 },
    { name: 'Marketplace', index: 4 },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-darker/80 backdrop-blur-md' : 'bg-black/20 backdrop-blur-xl'
      } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
              <div className="relative bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-xl w-10 h-10 flex items-center justify-center text-white font-black text-lg shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                <div className="relative">
                  F
                  <Sparkles className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-yellow-300 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-white tracking-tight">FanVerse</span>
              <span className="text-xs text-purple-300 font-medium -mt-0.5">Create • Connect • Celebrate</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onSectionClick(item.index)}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  currentSection === item.index
                    ? 'text-purple-300 bg-purple-500/20 shadow-lg shadow-purple-500/25 scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => onAuthClick('signin')}
              className="px-4 py-2 text-white/80 hover:text-white transition-all duration-300 flex items-center gap-2 font-medium hover:scale-105 text-sm"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
            <button
              onClick={() => onAuthClick('signup')}
              className="relative group px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden text-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">Sign Up Free</span>
            </button>
          </div>

          {/* Mobile Menu Toggle + Sign Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={() => onAuthClick('signin')}
              className="text-white/80 text-xs px-2 py-1 rounded hover:text-white transition-all duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => onAuthClick('signup')}
              className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-black/40 backdrop-blur-xl border-t border-white/10`}
      >
        <div className="px-4 py-5 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                onSectionClick(item.index);
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                currentSection === item.index
                  ? 'text-purple-300 bg-purple-500/20 shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.name}
            </button>
          ))}

          <div className="flex flex-col gap-3 pt-3">
            <button
              onClick={() => {
                onAuthClick('signin');
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-white/80 hover:text-white transition-all duration-300 text-left text-sm"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onAuthClick('signup');
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg text-sm hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
