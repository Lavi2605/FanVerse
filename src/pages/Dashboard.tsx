import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Film, Tv, BookOpen } from 'lucide-react';
import { getPreferences } from '../services/auth';

interface UserPreferences {
  games: string[];
  movies_series: string[];
  anime: string[];
  cartoons: string[];
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/signin');
          return;
        }

        const userPreferences = await getPreferences(parseInt(userId));
        setPreferences(userPreferences);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching preferences:', error);
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-darker flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const getThemeColor = () => {
    if (!preferences) return 'from-primary-light via-secondary to-accent';
    
    // Determine theme based on most selected preferences
    const counts = {
      games: preferences.games.length,
      movies_series: preferences.movies_series.length,
      anime: preferences.anime.length,
      cartoons: preferences.cartoons.length
    };

    const maxCategory = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    switch (maxCategory) {
      case 'games':
        return 'from-purple-500 via-blue-500 to-green-500';
      case 'movies_series':
        return 'from-red-500 via-yellow-500 to-orange-500';
      case 'anime':
        return 'from-pink-500 via-purple-500 to-indigo-500';
      case 'cartoons':
        return 'from-green-500 via-blue-500 to-purple-500';
      default:
        return 'from-primary-light via-secondary to-accent';
    }
  };

  return (
    <div className="min-h-screen bg-dark-darker">
      <div className={`h-32 bg-gradient-to-r ${getThemeColor()} opacity-20`} />
      
      <div className="container mx-auto px-4 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8"
        >
          <h1 className="text-4xl font-orbitron font-bold text-white mb-8">
            Your Personalized Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Games Section */}
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <Gamepad2 className="w-8 h-8 text-primary-light mr-3" />
                <h2 className="text-xl font-orbitron text-white">Games</h2>
              </div>
              {preferences?.games.map((game, index) => (
                <div key={index} className="text-gray-300 mb-2">
                  • {game}
                </div>
              ))}
            </div>

            {/* Movies & Series Section */}
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <Film className="w-8 h-8 text-secondary mr-3" />
                <h2 className="text-xl font-orbitron text-white">Movies & Series</h2>
              </div>
              {preferences?.movies_series.map((movie, index) => (
                <div key={index} className="text-gray-300 mb-2">
                  • {movie}
                </div>
              ))}
            </div>

            {/* Anime Section */}
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <Tv className="w-8 h-8 text-accent mr-3" />
                <h2 className="text-xl font-orbitron text-white">Anime</h2>
              </div>
              {preferences?.anime.map((anime, index) => (
                <div key={index} className="text-gray-300 mb-2">
                  • {anime}
                </div>
              ))}
            </div>

            {/* Cartoons Section */}
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-primary-light mr-3" />
                <h2 className="text-xl font-orbitron text-white">Cartoons</h2>
              </div>
              {preferences?.cartoons.map((cartoon, index) => (
                <div key={index} className="text-gray-300 mb-2">
                  • {cartoon}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Content Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-orbitron text-white mb-6">
              Recommended for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add recommended content based on preferences */}
              <div className="glass-card p-6 hover-scale">
                <h3 className="text-lg font-orbitron text-primary-light mb-2">
                  Trending Now
                </h3>
                <p className="text-gray-300">
                  Based on your preferences, we think you'll love these trending items.
                </p>
              </div>
              <div className="glass-card p-6 hover-scale">
                <h3 className="text-lg font-orbitron text-secondary mb-2">
                  New Releases
                </h3>
                <p className="text-gray-300">
                  Check out the latest releases in your favorite categories.
                </p>
              </div>
              <div className="glass-card p-6 hover-scale">
                <h3 className="text-lg font-orbitron text-accent mb-2">
                  Community Picks
                </h3>
                <p className="text-gray-300">
                  See what others with similar interests are enjoying.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 