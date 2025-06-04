import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { savePreferences } from '../services/auth';

const Preferences: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    games: [] as string[],
    movies_series: [] as string[],
    anime: [] as string[],
    cartoons: [] as string[]
  });

  const handlePreferenceChange = (category: string, value: string) => {
    setPreferences(prev => {
      const currentValues = prev[category as keyof typeof prev] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [category]: newValues
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      await savePreferences(parseInt(userId), preferences);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-darker flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-2xl p-8"
      >
        <h2 className="text-3xl font-orbitron font-bold text-center mb-8 text-white">
          Tell Us About Your Interests
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Games Section */}
          <div>
            <h3 className="text-xl font-orbitron text-primary-light mb-4">Games</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Action', 'RPG', 'Strategy', 'Sports', 'Adventure', 'Puzzle'].map(game => (
                <label key={game} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.games.includes(game)}
                    onChange={() => handlePreferenceChange('games', game)}
                    className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                  />
                  <span className="text-gray-300">{game}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Movies & Series Section */}
          <div>
            <h3 className="text-xl font-orbitron text-primary-light mb-4">Movies & Series</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Documentary'].map(genre => (
                <label key={genre} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.movies_series.includes(genre)}
                    onChange={() => handlePreferenceChange('movies_series', genre)}
                    className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                  />
                  <span className="text-gray-300">{genre}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Anime Section */}
          <div>
            <h3 className="text-xl font-orbitron text-primary-light mb-4">Anime</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Shonen', 'Seinen', 'Slice of Life', 'Mecha', 'Fantasy', 'Romance'].map(genre => (
                <label key={genre} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.anime.includes(genre)}
                    onChange={() => handlePreferenceChange('anime', genre)}
                    className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                  />
                  <span className="text-gray-300">{genre}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cartoons Section */}
          <div>
            <h3 className="text-xl font-orbitron text-primary-light mb-4">Cartoons</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Comedy', 'Adventure', 'Fantasy', 'Superhero', 'Educational', 'Action'].map(genre => (
                <label key={genre} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.cartoons.includes(genre)}
                    onChange={() => handlePreferenceChange('cartoons', genre)}
                    className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                  />
                  <span className="text-gray-300">{genre}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-primary-light via-secondary to-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Save Preferences
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Preferences; 