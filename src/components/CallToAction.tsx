import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would handle form submission in a real application
    alert(`Thanks for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-darker opacity-90 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-light rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute top-1/3 -right-10 w-60 h-60 bg-secondary rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute -bottom-10 left-1/3 w-50 h-50 bg-accent rounded-full blur-[100px] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-glow">
              Join The <span className="text-primary-light">FanVerse</span> Today
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Be part of our growing community of pop culture enthusiasts. Sign up now and start connecting with fans like you!
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button className="btn-primary text-lg w-full md:w-auto flex items-center justify-center space-x-2">
              <span>Create Account</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="btn-secondary text-lg w-full md:w-auto">
              Sign In
            </button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-center text-gray-400 mb-4">Stay updated with our newsletter</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-dark-light text-white border border-gray-700 focus:outline-none focus:border-primary-light sm:rounded-r-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="mt-2 sm:mt-0 btn-primary sm:rounded-l-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;