import React, { useState } from 'react';
import { Heart, Twitter, Github, Instagram, Mail, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Mail, href: 'mailto:contact@fanverse.com', label: 'Email', color: 'hover:text-green-400' },
  ];

  const footerLinks = {
    Product: ['Features', 'Pricing', 'API', 'Integrations'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Tutorials'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  };

  return (
    <section className="h-screen snap-start flex flex-col justify-end border-t border-white/10 relative z-10 px-6 py-10">
    <div className="absolute bottem-0 left-0 w-full h-2/3 bg-black/40 backdrop-blur-2xl -z-10" />

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 mb-12 border border-white/20 backdrop-blur-sm"
          >
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                <h3 className="text-2xl font-black text-white">Stay in the Loop</h3>
                <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
              </div>
              <p className="text-white/80 mb-6 text-base leading-relaxed">
                Get the latest updates, creator spotlights, and platform news delivered to your inbox.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                aria-live="polite"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 text-sm"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                />
                <button
                  type="submit"
                  className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 justify-center hover:scale-105 text-sm"
                >
                  {isSubscribed ? (
                    <>
                      <Heart className="w-4 h-4 text-red-400 fill-current" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Footer Links & Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12"
          >
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
                  <div className="relative bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-xl w-10 h-10 flex items-center justify-center text-white font-black text-lg shadow-2xl">
                    <div className="relative">
                      F
                      <Sparkles className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-yellow-300 animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl text-white tracking-tight">FanVerse</span>
                  <span className="text-xs text-purple-300 font-medium -mt-0.5">Create • Connect • Celebrate</span>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed max-w-sm text-sm">
                Empowering creators and fans to build amazing communities around shared passions.
                Join the revolution and turn your creativity into your career.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, ...social }) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-white/80 group-hover:text-current transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="space-y-4"
              >
                <h3 className="font-black text-white text-base">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/70 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-white/70 text-sm text-center md:text-left">
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
                <span>by the FanVerse team</span>
              </div>
              <div>© 2025 FanVerse. All rights reserved.</div>
            </div>
          </div>
        </div>
      </motion.footer>
    </section>
  );
};

export default Footer;
