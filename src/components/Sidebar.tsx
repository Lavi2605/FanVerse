import React from 'react';
import { FaThLarge, FaGavel, FaStore, FaWallet, FaLayerGroup, FaTags, FaHeart, FaEnvelope, FaHistory, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const menuItems = [
  { icon: <FaThLarge />, label: 'Dashboard', active: true, path: '/dashboard' },
  { icon: <FaGavel />, label: 'Active Bids', badge: '19', badgeColor: 'bg-pink-500', path: '/active-bids' },
  { icon: <FaStore />, label: 'Marketplace', badge: '09', badgeColor: 'bg-blue-400', path: '/marketplace' },
  { icon: <FaWallet />, label: 'My Wallet', path: '/wallet' },
  { icon: <FaLayerGroup />, label: 'My Collections', path: '/collections' },
  { icon: <FaTags />, label: 'Sell', badge: '4k', badgeColor: 'bg-green-400', path: '/sell' },
  { icon: <FaHeart />, label: 'Saved', badge: '32', badgeColor: 'bg-pink-400', path: '/saved' },
  { icon: <FaEnvelope />, label: 'Message', badge: '19', badgeColor: 'bg-pink-500', path: '/messages' },
  { icon: <FaHistory />, label: 'History', path: '/history' },
];

const settingsItems = [
  { icon: <FaUser />, label: 'My Profile', path: '/profile' },
  { icon: <FaCog />, label: 'Setting', path: '/settings' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gradient-to-b from-[#2d185a] to-[#18122b] w-64 min-h-screen flex flex-col justify-between py-6 px-2">
      <div>
        <div className="flex items-center gap-3 px-4 mb-8">
          <div className="bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-2xl">F</div>
          <span className="font-extrabold text-2xl text-white tracking-wide">NFTMAX</span>
        </div>
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link 
                  to={item.path} 
                  className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition ${item.active ? 'bg-gradient-to-r from-purple-700 to-blue-700 text-white font-bold' : 'hover:bg-[#231a3a] text-purple-100'}`}
                >
                  <span className="flex items-center gap-3 text-lg">{item.icon} {item.label}</span>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.badgeColor} text-white font-bold`}>{item.badge}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 px-4 text-purple-400 text-xs uppercase tracking-wider">Setting</div>
        <ul className="mt-2 space-y-1">
          {settingsItems.map((item, idx) => (
            <li key={idx}>
               <Link 
                to={item.path} 
                className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-[#231a3a] text-purple-100"
               >
                 {item.icon} {item.label}
               </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-4 mt-8">
        <button className="w-full flex items-center gap-3 justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 rounded-full hover:opacity-90 transition">
          <FaSignOutAlt /> Signout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 