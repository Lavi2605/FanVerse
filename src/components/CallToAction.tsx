import React from 'react';
import { motion, Variants, TargetAndTransition } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react';
import AnimatedHeading from '../components/AnimatedHeading';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number): TargetAndTransition => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1], // cubic-bezier equivalent of easeInOut
    },
  }),
};

const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const CallToAction: React.FC = () => {
  return (
    <motion.section
      id="cta"
      className="snap-start min-h-screen flex flex-col relative overflow-hidden px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Gradient Blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/40 to-indigo-900/50" />
      <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-16 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse-slow" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center space-y-2 pt-10 pb-15">
          {/* Badge */}
          <motion.div
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full border border-purple-500/40 backdrop-blur-sm mt-2"
        >
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          <span className="text-xs font-semibold text-white/95">Join the Revolution</span>
        </motion.div>


          {/* Title + Paragraph */}
            <motion.div custom={1} variants={fadeUp} className="space-y-6">
            <h2><AnimatedHeading
              text={"Ready to Create\nYour Legacy?"} isActive={true}
              className="float-after text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-t from-purple-400 via-pink-400 to-purple-600 leading-tight max-w-4xl mx-auto"
            /></h2>

            <p className="text-lg md:text-xl text-white/85 max-w-4xl mx-auto leading-relaxed font-medium">
              Join millions of creators who are already building their communities, 
              monetizing their passion, and making their mark in the FanVerse.
            </p>
            </motion.div>

          {/* Benefits */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Users, title: "Build Community", desc: "Connect with fans who share your passion" },
              { icon: Zap, title: "Create Content", desc: "Use our powerful tools to bring ideas to life" },
              { icon: Sparkles, title: "Earn Revenue", desc: "Monetize your creativity and passion" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={fadeUp}
                className="flex flex-col items-center space-y-4 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-black text-white text-lg mb-2">{title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <motion.button
              custom={0}
              variants={fadeUp}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl text-lg hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Start Creating Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </motion.button>

            <motion.button
              custom={1}
              variants={fadeUp}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-4 hover:scale-105"
            >
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-yellow-400" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Social Proof */}
      <motion.div
        custom={4}
        variants={fadeUp}
        className="relative z-10 flex-1 flex items-center justify-center"
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <div className="text-center mb-8">
              <p className="text-white/70 text-base font-medium">Trusted by creators worldwide</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                ['10M+', 'Active Creators'],
                ['$50M+', 'Creator Earnings'],
                ['1B+', 'Content Views'],
              ].map(([stat, label]) => (
                <div key={label} className="space-y-3">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{stat}</div>
                  <p className="text-white/80 font-semibold text-base">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-base text-white/70 font-medium">
              Free to start • No credit card required • Join in seconds
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CallToAction;
