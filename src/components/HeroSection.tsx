import { Play, Star, Users, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-16 font-sora">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-transparent to-pink-900/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

      {/* Main Container */}
      <div className="relative z-20 max-w-6xl mx-auto text-center space-y-8 px-4 md:px-8">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full border border-purple-500/40 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span className="text-xs font-semibold text-white/95">Welcome to the Future of Fan Engagement</span>
          <ArrowRight className="w-3 h-3 text-purple-300" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-monoton text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 leading-tight tracking-tight"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          FANVERSE
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-xl md:text-3xl lg:text-4xl font-bold text-white/95 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Where Fans Become
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 block mt-1">
            Creators
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Join millions of fans in creating, sharing, and celebrating the content you love.
          Build communities, showcase your creativity, and connect with creators worldwide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl text-lg hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="relative z-10">Get Started Free</span>
          </button>

          <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3 hover:scale-105">
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-yellow-400" />
            <span>Watch Demo</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {[
            { icon: <Users className="w-8 h-8 text-purple-400 mr-2" />, label: 'Active Fans', value: '10M+' },
            { icon: <Star className="w-8 h-8 text-yellow-400 mr-2" />, label: 'Creators', value: '500K+' },
            { icon: <Zap className="w-8 h-8 text-pink-400 mr-2" />, label: 'Interactions', value: '1B+' },
          ].map(({ icon, label, value }, idx) => (
            <div key={idx} className="text-center space-y-3 group hover:scale-110 transition-all duration-500 cursor-pointer">
              <div className="flex items-center justify-center">
                {icon}
                <span className="text-3xl md:text-4xl font-black text-white">{value}</span>
              </div>
              <p className="text-white/70 font-semibold">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-24 left-12 animate-float">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full backdrop-blur-sm border border-purple-500/40 animate-glow" />
      </div>
      <div className="absolute bottom-24 right-12 animate-float-delayed">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full backdrop-blur-sm border border-pink-500/40 animate-glow" />
      </div>
      <div className="absolute top-1/2 left-24 animate-pulse">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-glow" />
      </div>
      <div className="absolute top-1/3 right-32 animate-pulse">
        <div className="w-3 h-3 bg-pink-400 rounded-full animate-glow" />
      </div>
    </section>
  );
};

export default HeroSection;
