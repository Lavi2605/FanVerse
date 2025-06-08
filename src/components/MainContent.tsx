import React from 'react';

interface MainContentProps {
  isDarkMode: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ isDarkMode }) => {
  const userEmail = localStorage.getItem('userEmail') || 'User';
  const userId = localStorage.getItem('userId');
  const userName = userEmail.split('@')[0]; // Simple way to get a username from email

  return (
    <main className={`flex-1 ${isDarkMode ? 'bg-gradient-to-br from-[#1a1333] to-[#231a3a]' : 'bg-gradient-to-br from-gray-50 to-gray-100'} p-8 min-h-screen overflow-y-auto`}>
      {/* Featured NFT Card */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className={`flex-1 ${isDarkMode ? 'bg-gradient-to-tr from-purple-700 to-blue-800' : 'bg-gradient-to-tr from-purple-500 to-blue-600'} rounded-2xl p-6 flex flex-col md:flex-row items-center shadow-lg`}>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <img src={`https://www.gravatar.com/avatar/${userId}?d=identicon`} className="rounded-full border-2 border-white" alt="user" />
              <div>
                <div className="font-bold text-white">{userEmail}</div>
                <div className={`text-xs ${isDarkMode ? 'text-purple-200' : 'text-purple-100'}`}>@{userName}</div>
              </div>
            </div>
            <div className="text-white text-lg font-semibold mb-2">Lock and Lob x Fiesta Spurs</div>
            <div className="flex gap-8 mb-4">
              <div>
                <div className={`text-xs ${isDarkMode ? 'text-purple-200' : 'text-purple-100'}`}>Current Bid</div>
                <div className="font-bold text-xl text-white">75,320 ETH</div>
                <div className={`text-xs ${isDarkMode ? 'text-purple-300' : 'text-purple-200'}`}>773.69 USD</div>
              </div>
              <div>
                <div className={`text-xs ${isDarkMode ? 'text-purple-200' : 'text-purple-100'}`}>Remaining Time</div>
                <div className="font-bold text-xl text-white">47 : 23 : 59</div>
                <div className={`text-xs ${isDarkMode ? 'text-purple-300' : 'text-purple-200'}`}>Hrs : Mins : Sec</div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold hover:bg-pink-600 transition">Place a Bid</button>
              <button className="text-white underline">View Artwork</button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="NFT" className="rounded-xl w-64 h-40 object-cover" />
          </div>
        </div>
        {/* Statistics Card */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className={`${isDarkMode ? 'bg-gradient-to-tr from-purple-800 to-blue-900' : 'bg-gradient-to-tr from-purple-600 to-blue-700'} rounded-2xl p-6 shadow-lg flex flex-col items-center`}>
            <div className="font-bold text-white mb-2">Statistics</div>
            <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">Chart</div>
            <div className="mt-4 text-sm text-purple-200">
              <div>Total Sold: <span className="text-yellow-400">●</span></div>
              <div>Total Cancel: <span className="text-pink-400">●</span></div>
              <div>Total Pending: <span className="text-blue-400">●</span></div>
            </div>
          </div>
          {/* ETH Rate Card */}
          <div className={`${isDarkMode ? 'bg-gradient-to-tr from-purple-800 to-blue-900' : 'bg-gradient-to-tr from-purple-600 to-blue-700'} rounded-2xl p-6 shadow-lg`}>
            <div className="font-bold text-white mb-2">ETH rate</div>
            <div className="text-white text-2xl font-bold">$7473.67 USD</div>
            <div className="text-green-400 font-bold">+324.75 (11.5%)</div>
            <div className="mt-4">
              <div className={`w-full h-16 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-800'} rounded-lg flex items-center justify-center text-purple-400`}>Graph</div>
              <div className="flex justify-between text-xs text-purple-300 mt-2">
                <span>12:00 AM</span><span>4:00 AM</span><span>8:00 AM</span>
              </div>
            </div>
          </div>
          {/* Top Creators Card */}
          <div className={`${isDarkMode ? 'bg-gradient-to-tr from-purple-800 to-blue-900' : 'bg-gradient-to-tr from-purple-600 to-blue-700'} rounded-2xl p-6 shadow-lg`}>
            <div className="font-bold text-white mb-2">Top Creators <span className="text-purple-300 text-xs">Weekly</span></div>
            <div className="flex items-center gap-3 mt-2">
              <img src="https://i.pravatar.cc/32" className="rounded-full border-2 border-white" alt="creator" />
              <div>
                <div className="text-white font-bold">Albert Flores</div>
                <div className="text-purple-300 text-xs">@broklinslam_75</div>
              </div>
              <div className="ml-auto text-white font-bold">$7,473.67</div>
            </div>
          </div>
        </div>
      </div>
      {/* Create NFT Banner */}
      <div className={`${isDarkMode ? 'bg-gradient-to-tr from-[#231a3a] to-[#2d185a]' : 'bg-gradient-to-tr from-purple-500 to-blue-600'} rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between mb-8 shadow-lg`}>
        <div>
          <div className="text-white font-bold text-xl mb-2">Create your own NFT and extraordinary get lot of Sell.</div>
          <div className="text-purple-300 text-sm">Buy and sell NFTs from the world's top artists</div>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-700 transition">Upload Products</button>
          <button className="text-white underline">View Artwork</button>
        </div>
      </div>
      {/* Trending NFTs Section */}
      <div>
        <div className="font-bold text-white text-xl mb-4">Trending Action</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className={`${isDarkMode ? 'bg-gradient-to-tr from-purple-700 to-blue-800' : 'bg-gradient-to-tr from-purple-500 to-blue-600'} rounded-2xl p-4 shadow-lg`}>
              <img src={`https://source.unsplash.com/random/200x200?sig=${i}`} className="rounded-xl mb-2" alt="NFT" />
              <div className="flex items-center gap-2">
                <img src="https://i.pravatar.cc/24" className="rounded-full border-2 border-white" alt="owner" />
                <span className="text-white text-xs">Owned by <span className="font-bold">Bilout</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainContent; 