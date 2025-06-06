import React from 'react';
import { FaMoon, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'User';
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-[#2d185a] to-[#18122b] px-8 py-4 rounded-b-2xl shadow-lg">
      <div className="flex items-center gap-4 w-1/2">
        <input className="rounded-full px-6 py-2 w-full bg-[#231a3a] text-white placeholder-purple-300 focus:outline-none" placeholder="Search items, collections..." />
      </div>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 bg-[#231a3a] text-white px-4 py-2 rounded-full font-bold hover:bg-purple-700 transition">
          <FaMoon className="text-yellow-300" />
          Dark Mode
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#231a3a] text-white px-4 py-2 rounded-full font-bold hover:bg-red-700 transition"
        >
          <FaSignOutAlt className="text-red-400" />
          Logout
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <img 
            src={`https://www.gravatar.com/avatar/${userId}?d=identicon`} 
            alt="avatar" 
            className="rounded-full w-10 h-10 border-2 border-purple-400" 
          />
          <div className="text-white font-bold">{userEmail}</div>
          <span className="text-purple-300 text-xs">@{userEmail.split('@')[0]}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar; 