import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/signin');
          return;
        }

        await getPreferences(parseInt(userId));
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
      <div className={`min-h-screen ${isDarkMode ? 'bg-dark-darker' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-xl`}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-dark-darker' : 'bg-gray-50'}`}>
      <Sidebar isDarkMode={isDarkMode} />
      <div className="flex-1 flex flex-col">
        {/* Pass dark mode props to Topbar */}
        <Topbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <MainContent isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Dashboard; 