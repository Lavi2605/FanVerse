import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-darker text-white">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;