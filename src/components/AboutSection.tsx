import React from 'react';
import { Heart, Globe, Lightbulb, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedHeading from '../components/AnimatedHeading';

const AboutSection: React.FC<{ visible: boolean }> = ({ visible }) => {
  const features = [
    {
      icon: Heart,
      title: 'Passionate Community',
      description: 'Connect with like-minded fans who share your interests and passions.',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Share your content with fans from around the world in real-time.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      icon: Lightbulb,
      title: 'Creative Tools',
      description: 'Access powerful tools to bring your fan creations to life.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
    {
      icon: Users,
      title: 'Collaborative Space',
      description: 'Work together with other fans on amazing collaborative projects.',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20">
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-900/40 via-transparent to-cyan-900/40" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="space-y-6 text-center mb-16">
        <h2><AnimatedHeading text="About FanVerse" isActive={visible}
        className="float-after text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-t from-indigo-400/70 via-cyan-400/70 to-indigo-600 leading-tight max-w-4xl mx-auto"
        /></h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-white/85 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            We're building the ultimate platform where fans don’t just consume content — they
            create, collaborate, and build communities around what they love most.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="space-y-6"
          >
            {[
              {
                title: 'Our Mission',
                content:
                  'To empower every fan to become a creator, building bridges between fandoms and fostering creativity in ways never before possible.',
              },
              {
                title: 'Our Vision',
                content:
                  'A world where every fan has the tools, community, and platform to share their creativity with others who understand and appreciate their passion.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 group"
              >
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      className={`${feature.bgColor} rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:scale-110 transition-all duration-500 group cursor-pointer`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={visible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Icon className={`w-8 h-8 ${feature.color} mb-3 group-hover:scale-125 transition-transform duration-300`} />
                      <h4 className="font-black text-white text-sm mb-2">{feature.title}</h4>
                      <p className="text-white/70 text-xs leading-relaxed">{feature.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Decorative Bubbles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full animate-pulse-slow" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full animate-pulse-slow" />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full border border-cyan-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Globe className="w-6 h-6 text-cyan-400 group-hover:animate-pulse" />
            <span className="text-white font-bold text-lg">Join Our Growing Community</span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-2 border-white/20" />
              ))}
              <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-white/20 flex items-center justify-center">
                <span className="text-xs text-white font-black">10M+</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
