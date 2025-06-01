import React from 'react';
import { Users, Globe, Heart, Shield } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-animated">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-glow">
            About <span className="text-primary-light">FanVerse</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your ultimate destination for all things pop culture, where fans unite to celebrate their passions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Users className="h-8 w-8 text-primary-light" />
              <h3 className="text-xl font-orbitron font-bold">Our Mission</h3>
            </div>
            <p className="text-gray-300">
              To create a vibrant, inclusive space where fans from all walks of life can connect, share, and celebrate their love for pop culture.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Globe className="h-8 w-8 text-secondary" />
              <h3 className="text-xl font-orbitron font-bold">Global Community</h3>
            </div>
            <p className="text-gray-300">
              Join millions of fans worldwide in discussions, events, and activities that bring the global pop culture community together.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Heart className="h-8 w-8 text-accent" />
              <h3 className="text-xl font-orbitron font-bold">Fan-First Approach</h3>
            </div>
            <p className="text-gray-300">
              Everything we do is designed with fans in mind, from our features to our community guidelines.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Shield className="h-8 w-8 text-primary-light" />
              <h3 className="text-xl font-orbitron font-bold">Safe Space</h3>
            </div>
            <p className="text-gray-300">
              We maintain a safe, respectful environment where everyone can express their passion without fear.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 