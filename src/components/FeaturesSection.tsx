import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Video, MessageSquare, Trophy, Sparkles, Share2 } from 'lucide-react';
import AnimatedHeading from '../components/AnimatedHeading';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Palette,
      title: 'Creative Studio',
      description: 'Professional-grade tools for creating stunning fan art, videos, and content.',
      gradient: 'from-pink-500 to-purple-600',
      delay: '0ms',
    },
    {
      icon: Video,
      title: 'Live Streaming',
      description: 'Stream your creative process and connect with fans in real-time.',
      gradient: 'from-red-500 to-pink-600',
      delay: '100ms',
    },
    {
      icon: MessageSquare,
      title: 'Community Discussions',
      description: 'Engage in meaningful conversations about your favorite fandoms.',
      gradient: 'from-blue-500 to-cyan-600',
      delay: '200ms',
    },
    {
      icon: Trophy,
      title: 'Competitions & Events',
      description: 'Participate in contests and showcase your talents to win amazing prizes.',
      gradient: 'from-yellow-500 to-orange-600',
      delay: '300ms',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Tools',
      description: 'Leverage artificial intelligence to enhance your creative workflow.',
      gradient: 'from-purple-500 to-blue-600',
      delay: '400ms',
    },
    {
      icon: Share2,
      title: 'Cross-Platform Sharing',
      description: 'Share your content seamlessly across all major social platforms.',
      gradient: 'from-green-500 to-teal-600',
      delay: '500ms',
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20 pb-12">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-pink-900/30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full border border-purple-500/40 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/95">Powerful Features</span>
          </div>
          <div className="space-y-6"></div>
          <h2><AnimatedHeading text="Everything You Need" isActive={true}
          className="float-after text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-t from-purple-400 via-pink-400 to-purple-600 leading-tight max-w-4xl mx-auto mb-4"
          /></h2>
          <motion.p
            className="text-lg md:text-xl text-white/85 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            From creation to collaboration, we've built the ultimate toolkit for fans and creators.
          </motion.p>
        </div>

        <div className="relative -top-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-20">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />

                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed group-hover:text-white/95 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
            <button className="group px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl text-lg hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto mt-[-6rem]">
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Explore All Features
            </button>
        </div>

        <div className="absolute top-24 left-12 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-24 right-12 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse-slow" />
      </div>
    </section>
  );
};

export default FeaturesSection;
