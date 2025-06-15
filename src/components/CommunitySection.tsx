import React from 'react';
import { Users, MessageCircle, Star, Zap, Award, Heart } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

const CommunitySection: React.FC = () => {
  const communityStats = [
    { icon: Users, value: '10M+', label: 'Active Members', color: 'text-blue-400' },
    { icon: MessageCircle, value: '50M+', label: 'Messages Daily', color: 'text-green-400' },
    { icon: Star, value: '1M+', label: 'Content Pieces', color: 'text-yellow-400' },
    { icon: Award, value: '100K+', label: 'Achievements', color: 'text-purple-400' },
  ];

  const communities = [
    {
      name: 'Anime Creators',
      members: '2.5M',
      image: 'https://images.pexels.com/photos/8892235/pexels-photo-8892235.jpeg?w=400&h=400&fit=crop',
      gradient: 'from-pink-500 to-red-500',
    },
    {
      name: 'Game Developers',
      members: '1.8M',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?w=400&h=400&fit=crop',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      name: 'Art & Design',
      members: '3.2M',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?w=400&h=400&fit=crop',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Music & Audio',
      members: '1.9M',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=400&h=400&fit=crop',
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20 pb-12">
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/40 via-transparent to-purple-900/40" />

      {/* Floating Decor Elements */}
      <div className="absolute top-24 left-12 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse-slow" />
      <div className="absolute bottom-24 right-12 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse-slow" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full border border-blue-500/40 backdrop-blur-sm mb-8">
            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/95">Join the Community</span>
          </div>
            <div className="space y-6"></div>
            <h2><AnimatedHeading text="Where Fans Unite" isActive={true}
             className="float-after text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-t from-blue-400/70 via-purple-400/70 to-blue-600 leading-tight max-w-4xl mx-auto mb-2"/>
          </h2>

          <p className="text-lg md:text-xl text-white/85 max-w-4xl mx-auto leading-relaxed font-medium">
            Connect with millions of passionate fans, share your creations, and build lasting friendships in communities that celebrate what you love.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, _index) => { /* eslint-disable-line */
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-110 group"
              >
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-125 transition-transform duration-300`} />
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm font-semibold">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Community Cards */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-12">
            Popular Communities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communities.map((community) => (
              <div
                key={community.name}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${community.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                </div>
                {/* Info */}
                <div className="p-6">
                  <h4 className="font-black text-white text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {community.name}
                  </h4>
                  <div className="flex items-center gap-2 text-white/70">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{community.members} members</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-10 md:p-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature list */}
            <div className="space-y-8">
              {[
                {
                  icon: MessageCircle,
                  title: 'Real-time Chat',
                  description: 'Connect instantly with community members through our lightning-fast messaging system.',
                  gradient: 'from-blue-500 to-purple-500',
                },
                {
                  icon: Zap,
                  title: 'Events & Meetups',
                  description: 'Join virtual and in-person events organized by community leaders and fellow fans.',
                  gradient: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Award,
                  title: 'Recognition System',
                  description: 'Earn badges and achievements for your contributions to the community.',
                  gradient: 'from-pink-500 to-red-500',
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div className="flex items-start gap-4 group" key={i}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-xl mb-2">{feature.title}</h4>
                      <p className="text-white/80 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-black text-white mb-6 leading-tight">
                Ready to Join the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block mt-1">
                  FanVerse Community?
                </span>
              </h3>
              <p className="text-white/80 mb-8 leading-relaxed text-lg">
                Discover your tribe, share your passion, and be part of something bigger. Your community is waiting for you.
              </p>
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl text-lg hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto lg:mx-0">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
