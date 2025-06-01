import React from 'react';
import { MessageSquare, Users, Calendar, Trophy } from 'lucide-react';

const CommunitySection: React.FC = () => {
  return (
    <section id="community" className="py-20 bg-animated">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-glow">
            Join Our <span className="text-primary-light">Community</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with fellow fans, participate in discussions, and be part of exciting events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 hover-scale">
            <div className="mb-4 text-primary-light">
              <MessageSquare className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-orbitron font-bold mb-2">Active Forums</h3>
            <p className="text-gray-300">
              Engage in lively discussions about your favorite shows, games, and more.
            </p>
          </div>

          <div className="glass-card p-6 hover-scale">
            <div className="mb-4 text-secondary">
              <Users className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-orbitron font-bold mb-2">Fan Groups</h3>
            <p className="text-gray-300">
              Join specialized groups for your favorite fandoms and connect with like-minded fans.
            </p>
          </div>

          <div className="glass-card p-6 hover-scale">
            <div className="mb-4 text-accent">
              <Calendar className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-orbitron font-bold mb-2">Live Events</h3>
            <p className="text-gray-300">
              Participate in watch parties, Q&A sessions, and exclusive community events.
            </p>
          </div>

          <div className="glass-card p-6 hover-scale">
            <div className="mb-4 text-primary-light">
              <Trophy className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-orbitron font-bold mb-2">Fan Challenges</h3>
            <p className="text-gray-300">
              Take part in fun challenges, contests, and earn recognition in the community.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block glass-card p-8">
            <h3 className="text-2xl font-orbitron font-bold mb-4">Community Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-3xl font-bold text-primary-light">1M+</p>
                <p className="text-gray-400">Active Members</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">50K+</p>
                <p className="text-gray-400">Daily Posts</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">100+</p>
                <p className="text-gray-400">Fan Groups</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-light">24/7</p>
                <p className="text-gray-400">Active Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection; 