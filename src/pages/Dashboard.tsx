import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPreferences } from '../services/auth';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MainContent from '../components/MainContent';

interface UserPreferences {
  games: string[];
  movies_series: string[];
  anime: string[];
  cartoons: string[];
}

// Add props for dark mode
interface DashboardProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, toggleDarkMode }) => {
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

  return (
    <div className="flex h-screen bg-dark-darker">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Pass dark mode props to Topbar */}
        <Topbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard; 