import React from 'react';
import { ShoppingBag, Star, Shield, Zap } from 'lucide-react';

const MarketplaceSection: React.FC = () => {
  return (
    <section id="marketplace" className="py-20 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-glow">
            FanVerse <span className="text-primary-light">Marketplace</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Buy, sell, and trade collectibles with fellow fans in a secure and trusted environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary-light" />
              <h3 className="text-xl font-orbitron font-bold">Verified Collectibles</h3>
            </div>
            <p className="text-gray-300">
              Browse through a vast collection of authenticated merchandise, figures, and memorabilia.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Star className="h-8 w-8 text-secondary" />
              <h3 className="text-xl font-orbitron font-bold">Rare Finds</h3>
            </div>
            <p className="text-gray-300">
              Discover limited edition items and exclusive collectibles from your favorite franchises.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="text-xl font-orbitron font-bold">Secure Trading</h3>
            </div>
            <p className="text-gray-300">
              Trade with confidence using our secure escrow system and buyer protection.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Zap className="h-8 w-8 text-primary-light" />
              <h3 className="text-xl font-orbitron font-bold">Instant Listings</h3>
            </div>
            <p className="text-gray-300">
              List your items quickly and reach thousands of potential buyers instantly.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block glass-card p-8">
            <h3 className="text-2xl font-orbitron font-bold mb-4">Marketplace Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-primary-light">100%</p>
                <p className="text-gray-400">Secure Transactions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">24/7</p>
                <p className="text-gray-400">Support Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">0%</p>
                <p className="text-gray-400">Platform Fees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection; 