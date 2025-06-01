import React from 'react';
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
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-darker text-white relative">
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
  );
};

export default Home;