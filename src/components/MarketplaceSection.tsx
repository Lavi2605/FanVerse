import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag, TrendingUp, DollarSign,
  Shield, Star, Gift,
} from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

const MarketplaceSection: React.FC = () => {
  const marketplaceFeatures = [
    {
      icon: ShoppingBag,
      title: 'Creator Store',
      description: 'Sell your digital creations, merchandise, and exclusive content directly to fans.',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Track your sales, audience engagement, and revenue with detailed insights.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: DollarSign,
      title: 'Multiple Revenue Streams',
      description: 'Monetize through subscriptions, one-time purchases, tips, and commissions.',
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Industry-leading security ensures safe and reliable payment processing.',
      gradient: 'from-purple-500 to-indigo-600',
    },
  ];

  const featuredProducts = [
    {
      title: 'Digital Art Pack',
      creator: 'ArtistName',
      price: '$12.99',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?w=400&h=300&fit=crop',
      category: 'Art',
    },
    {
      title: 'Custom Avatars',
      creator: 'DesignPro',
      price: '$8.50',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?w=400&h=300&fit=crop',
      category: 'Design',
    },
    {
      title: 'Animation Pack',
      creator: 'AnimatorX',
      price: '$24.99',
      rating: 5.0,
      image: 'https://images.pexels.com/photos/1036642/pexels-photo-1036642.jpeg?w=400&h=300&fit=crop',
      category: 'Animation',
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-green-900/30 via-transparent to-blue-900/30" />
      <div className="relative z-10 max-w-6xl mx-auto w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600/30 to-blue-600/30 rounded-full border border-green-500/40 backdrop-blur-sm mb-6">
            <ShoppingBag className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/95">Creator Marketplace</span>
          </div>
          <div className="space-y-6"></div>
          <h2><AnimatedHeading text="Monetize Your Passion"isActive={true}
            className="float-after text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-t from-green-400 via-blue-400 to-green-600 leading-tight max-w-4xl mx-auto mb-2"
          /></h2>

          <p className="text-base md:text-lg text-white/85 max-w-3xl mx-auto leading-relaxed font-medium">
            Turn your creativity into income. Our marketplace empowers creators to sell their work 
            and build sustainable businesses around their passion.
          </p>
        </motion.div>

        {/* Marketplace Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {marketplaceFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-black text-white text-sm mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-400 transition-all duration-300 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16">
          <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-12">
            Featured Products
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-xs font-semibold text-white">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-semibold text-white">{product.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-black text-white text-base mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-400 transition-all duration-300 truncate">
                    {product.title}
                  </h4>
                  <p className="text-white/70 text-xs mb-3">by {product.creator}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-green-400">{product.price}</span>
                    <button className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-md hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 text-xs hover:scale-105">
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Seller Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <div className="text-center mb-8">
            <AnimatedHeading text="Start Selling Today"isActive={true} />
            <p className="text-white/80 text-base">
              Join thousands of creators already earning from their passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: DollarSign,
                title: 'Low Fees',
                desc: 'Keep more of what you earn with our competitive fee structure',
                color: 'text-green-400',
              },
              {
                icon: TrendingUp,
                title: 'Growth Tools',
                desc: 'Built-in marketing and analytics tools to grow your business',
                color: 'text-blue-400',
              },
              {
                icon: Gift,
                title: 'Creator Support',
                desc: 'Dedicated support team to help you succeed',
                color: 'text-purple-400',
              },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center space-y-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center mx-auto">
                    <Icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h4 className="font-black text-white text-lg">{benefit.title}</h4>
                  <p className="text-white/80 leading-relaxed text-sm">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <button className="group px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl text-base hover:shadow-2xl hover:shadow-green-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Start Selling Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
