import React from 'react';
import { 
  Users, MessageSquare, ShoppingBag, Brush, 
  Shield, Zap, Globe, Heart, Star 
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-card p-6 hover-scale">
      <div className="flex items-center space-x-4 mb-4">
        {icon}
        <h3 className="text-xl font-orbitron font-bold">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Connection",
      description: "Connect with fans who share your passion for games, anime, comics, movies, and TV shows."
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Interactive Forums",
      description: "Engage in heated debates and discussions on trending topics from your favorite fandoms."
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Collectibles Marketplace",
      description: "Buy, sell, and trade collectible figures and merchandise from your beloved franchises."
    },
    {
      icon: <Brush className="h-8 w-8" />,
      title: "Customizable Themes",
      description: "Personalize your profile with fully customizable themes that reflect your unique style."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safe Environment",
      description: "Enjoy a moderated platform where all fans can share their opinions respectfully."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Live Events",
      description: "Participate in live watch parties, game tournaments, and special community events."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Community",
      description: "Connect with pop culture enthusiasts from around the world, breaking cultural barriers."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Fan-Driven Content",
      description: "Share your fan art, stories, reviews, and theories with an appreciative audience."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Fan Rewards",
      description: "Earn points, badges, and exclusive rewards for your active participation."
    }
  ];

  return (
    <section id="features" className="py-20 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-glow">
            FanVerse <span className="text-primary-light">Features</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the amazing features that make FanVerse the ultimate destination for pop culture fans.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;