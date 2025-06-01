import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToContent = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed overflow-hidden"
      style={{ backgroundImage: 'url(/background.gif)' }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 text-center py-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl font-bungee bg-gradient-to-r from-[#00FF9D] via-[#00B8FF] to-[#FF00FF] bg-clip-text text-transparent relative">
              <span className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 text-4xl md:text-5xl hover:scale-110 transition-transform bg-black/30 rounded-full p-2">🎮</span>
              <span className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 text-4xl md:text-5xl hover:scale-110 transition-transform bg-black/30 rounded-full p-2">⚔️</span>
              FanVerse
            </h2>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6">
            <span className="text-primary-light">Your Ultimate</span> Pop Culture Universe
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
            Connect with fellow fans, debate your passions, and trade collectibles in one immersive community for gamers, anime lovers, comic enthusiasts, and pop culture fans.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button className="btn-primary text-lg">
              Sign Up Free
            </button>
            <button className="btn-secondary text-lg">
              Explore Features
            </button>
          </div>
          
          <div className="flex justify-center space-x-8 sm:space-x-16">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-orbitron font-bold text-primary-light">1M+</p>
              <p className="text-gray-400">Community Members</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-orbitron font-bold text-secondary">10K+</p>
              <p className="text-gray-400">Daily Discussions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-orbitron font-bold text-accent">5K+</p>
              <p className="text-gray-400">Collectibles Traded</p>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={scrollToContent}
      >
        <ChevronDown className="h-8 w-8 text-primary-light" />
      </div>
    </div>
  );
};

export default HeroSection;