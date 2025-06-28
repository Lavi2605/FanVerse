import React from 'react';
import { Users, MessageCircle, Star, Award, Heart, Zap } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

const CommunitySection: React.FC = () => {
  const statsLeft = [
    { icon: Users, value: '10M+', label: 'Active Members', color: 'text-blue-400' },
    { icon: MessageCircle, value: '50M+', label: 'Messages Daily', color: 'text-green-400' },
  ];
  const statsRight = [
    { icon: Star, value: '1M+', label: 'Content Pieces', color: 'text-yellow-400' },
    { icon: Award, value: '100K+', label: 'Achievements', color: 'text-purple-400' },
  ];
  const communities = [
    { name: 'Anime Creators', members: '2.5M', image: 'https://images.pexels.com/photos/8892235/pexels-photo-8892235.jpeg?w=400&h=400&fit=crop', gradient: 'from-pink-500 to-red-500' },
    { name: 'Game Developers', members: '1.8M', image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?w=400&h=400&fit=crop', gradient: 'from-blue-500 to-purple-500' },
    { name: 'Art & Design', members: '3.2M', image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?w=400&h=400&fit=crop', gradient: 'from-purple-500 to-pink-500' },
    { name: 'Music & Audio', members: '1.9M', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=400&h=400&fit=crop', gradient: 'from-green-500 to-teal-500' },
  ];

  return (
    <section className="relative min-h-screen flex justify-between items-center gap-6 px-4 pt-16">
      {/* Background & floating elements */}
      <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/40 via-transparent to-purple-900/40" />
      <div className="absolute top-24 left-12 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse-slow" />
      <div className="absolute bottom-24 right-12 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse-slow" />

      {/* Left stats */}
      <div className="flex flex-col space-y-4 z-10 relative left-8">
        {statsLeft.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-110 group">
              <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-125 transition-transform duration-300`} />
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm font-semibold">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Center content */}
      <div className="flex-1 max-w-5xl z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full border border-blue-500/40 backdrop-blur-sm mb-4">
            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/95">Join the Community</span>
          </div>
          <h2><AnimatedHeading text="Where Fans Unite" isActive={true}
             className="float-after text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-t from-blue-400/70 via-purple-400/70 to-blue-600 leading-tight max-w-4xl mx-auto mb-2"/>
          </h2>
          <p className="text-lg md:text-xl text-white/85 max-w-4xl mx-auto leading-relaxed font-medium">
            Connect with millions of passionate fans, share your creations, and build lasting friendships in communities that celebrate what you love.
          </p>
        </div>

        {/* Popular Communities */}
        <div className="mb-8">
          <h3 className="animate-pulse-slow text-2xl md:text-3xl font-black text-white text-center mb-4">Popular Communities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {communities.map((c) => (
              <div key={c.name} className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="relative h-32 overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                </div>
                <div className="p-4">
                  <h4 className="font-black text-white text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">{c.name}</h4>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <Users className="w-3 h-3" /> {c.members} members
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features + CTA */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 md:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              {[{ icon: MessageCircle, title: 'Real-time Chat', desc: 'Connect instantly with members.', gradient: 'from-blue-500 to-purple-500' },
                { icon: Zap, title: 'Events & Meetups', desc: 'Join events & meetups.', gradient: 'from-purple-500 to-pink-500' },
                { icon: Award, title: 'Recognition', desc: 'Earn badges & achievements.', gradient: 'from-pink-500 to-red-500' }].map((f,i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${f.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-xl">{f.title}</h4>
                      <p className="text-white/80 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-black text-white mb-4 leading-tight">
                Ready to Join the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block mt-1">
                  FanVerse Community?
                </span>
              </h3>
              <p className="text-s text-white/70 mb-4 leading-relaxed">Share your passion & be part of something bigger.\nYour community is waiting for you.</p>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto lg:mx-0">
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Join Community</button>
            </div>
          </div>
        </div>
      </div>

      {/* Right stats */}
      <div className="flex flex-col space-y-4 z-10 relative -left-8">
        {statsRight.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-110 group">
              <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-125 transition-transform duration-300`} />
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm font-semibold">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CommunitySection;
