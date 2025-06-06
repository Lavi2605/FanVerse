import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import CommunitySection from '../components/CommunitySection';
import MarketplaceSection from '../components/MarketplaceSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Home: React.FC = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-darker text-white relative flex">
      {/* Sidebar */}
      <aside className={`${isSidebarMinimized ? 'w-16' : 'w-64'} bg-[#1a1a2e] min-h-screen p-6 flex flex-col gap-8 fixed left-0 top-0 z-20 border-r border-gray-700 transition-all duration-300 items-center`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-2xl">F</div>
          {!isSidebarMinimized && <span className="font-extrabold text-2xl text-white tracking-wide">FanVerse</span>}
        </div>
        <nav className={`flex flex-col gap-4 w-full ${isSidebarMinimized ? 'items-center' : ''}`}>
          {!isSidebarMinimized && <a href="#" className="font-semibold text-violet-400">Home</a>}
          {!isSidebarMinimized && <a href="#" className="hover:text-violet-400">Explore</a>}
          {!isSidebarMinimized && <a href="#" className="hover:text-violet-400">About</a>}
          {!isSidebarMinimized && <a href="#" className="hover:text-violet-400">Features</a>}
          {!isSidebarMinimized && <a href="#" className="hover:text-violet-400">Community</a>}
          {!isSidebarMinimized && <a href="#" className="hover:text-violet-400">Marketplace</a>}
        </nav>
        <button onClick={() => setIsSidebarMinimized(!isSidebarMinimized)} className="mt-auto text-white w-full flex justify-center">
          {isSidebarMinimized ? '→' : '←'}
        </button>
      </aside>
      {/* Main Content */}
      <div className={`flex-1 ${isSidebarMinimized ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <div 
          className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/background.gif)',
            zIndex: 0
          }}
        />
        <ParticleBackground />
        <Navbar onNavClick={scrollToSection} />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <CommunitySection />
          <MarketplaceSection />
          <CallToAction />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;