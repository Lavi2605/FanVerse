import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag, TrendingUp, DollarSign,
  Shield, Star,
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
      image: 'https://images.pexels.com/photos/8252605/pexels-photo-8252605.jpeg?w=400&h=300&fit=crop',
      category: 'Art',
    },
    {
      title: 'Custom Avatars',
      creator: 'DesignPro',
      price: '$8.50',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1719233/pexels-photo-1719233.jpeg?w=300&h=200&fit=crop',
      category: 'Design',
    },
    {
      title: 'Animation Pack',
      creator: 'AnimatorX',
      price: '$24.99',
      rating: 5.0,
      image: 'https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?w=300&h=200&fit=crop',
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

          <p className="text-lg md:text-xl text-white/85 max-w-4xl mx-auto leading-relaxed font-medium">
            Turn your creativity into income. Our marketplace empowers creators to sell their work 
            and build sustainable businesses around their passion.
          </p>
        </motion.div>

        {/* Marketplace Features */}
        <div className="relative bottom-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
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
          <h3 className="animate-pulse-slow text-2xl md:text-3xl font-black text-white text-center mb-4">
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
      </div>
    </section>
  );
};

export default MarketplaceSection;
