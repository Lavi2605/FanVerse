import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, Edit2, User, Settings, Bell, MessageSquare, Users, Star, Heart, 
  ThumbsUp, Share2, ShoppingBag, Image, Video, Link, Smile, 
  ChevronUp, ChevronDown, Bookmark, Flag, MoreHorizontal, Search,
  Filter, TrendingUp, DollarSign, Tag, UserCircle, CheckCircle, XCircle, Loader2
} from 'lucide-react';
import { getPreferences, savePreferences, logoutUser } from '../services/auth';
import { toast } from 'react-hot-toast';

interface UserPreferences {
  games: string[];
  movies_series: string[];
  anime: string[];
  cartoons: string[];
}

interface Post {
  id: number;
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  type: 'text' | 'image' | 'video';
  upvotes: number;
  downvotes: number;
  tags: string[];
}

interface MarketItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  seller: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  category: string;
  tags: string[];
  status: 'available' | 'sold' | 'pending';
  location: string;
  shipping: 'free' | 'paid';
  views: number;
  favorites: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<UserPreferences>({
    games: [],
    movies_series: [],
    anime: [],
    cartoons: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('feed');
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPostType, setSelectedPostType] = useState<'text' | 'image' | 'video'>('text');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSellModal, setShowSellModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: '',
    category: 'gaming',
    condition: 'new' as const,
    location: '',
    shipping: 'free' as const,
    images: [] as string[]
  });
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Sample data for posts
  const [posts] = useState<Post[]>([
    {
      id: 1,
      author: 'GamingMaster',
      content: 'Just completed the new Zelda game! What an amazing experience! 🎮',
      image: 'https://picsum.photos/800/600',
      likes: 245,
      comments: 56,
      shares: 12,
      timestamp: '2 hours ago',
      type: 'image',
      upvotes: 156,
      downvotes: 8,
      tags: ['gaming', 'zelda', 'nintendo']
    },
    // Add more sample posts here
  ]);

  // Sample data for market items
  const [marketItems] = useState<MarketItem[]>([
    {
      id: 1,
      title: 'Limited Edition Gaming Console',
      description: 'Brand new, never opened. Includes all original accessories.',
      price: 499.99,
      image: 'https://picsum.photos/400/300',
      seller: 'GamingCollector',
      condition: 'new',
      category: 'gaming',
      tags: ['console', 'limited-edition', 'gaming'],
      status: 'available',
      location: 'New York',
      shipping: 'free',
      views: 1200,
      favorites: 50
    },
    // Add more sample market items here
  ]);

  useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/signin');
          return;
        }

    const fetchPreferences = async () => {
      try {
        const prefs = await getPreferences(parseInt(userId));
        setPreferences(prefs);
      } catch (err) {
        setError('Failed to load preferences');
      }
    };

    fetchPreferences();
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
  };

  const handleEditPreferences = () => {
    setIsEditing(true);
  };

  const handleSavePreferences = async (newPreferences: UserPreferences) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/signin');
        return;
      }

      await savePreferences(parseInt(userId), newPreferences);
      setPreferences(newPreferences);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save preferences');
    }
  };

  const handlePreferenceChange = (field: keyof UserPreferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim())
    }));
  };

  const handleVote = (postId: number, direction: 'up' | 'down') => {
    // Implement vote handling logic
  };

  const handleCreatePost = () => {
    // Implement post creation logic
    setShowCreatePost(false);
    setNewPostContent('');
  };

  const handleMarketItemClick = (itemId: number) => {
    // Implement market item click handling
  };

  // Toast notification helper
  const notify = (msg: string, type: 'success' | 'error' = 'success') => {
    if (type === 'success') toast.success(msg);
    else toast.error(msg);
  };

  // Confetti animation (simple emoji burst)
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleSellItem = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSellModal(false);
      setNewItem({
        title: '',
        description: '',
        price: '',
        category: 'gaming',
        condition: 'new',
        location: '',
        shipping: 'free',
        images: []
      });
      notify('Item listed successfully!');
      triggerConfetti();
    }, 1200);
  };

  const handleBuyItem = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowItemDetails(false);
      notify('Purchase successful!');
      triggerConfetti();
    }, 1200);
  };

  const handleItemClick = (item: MarketItem) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };

  return (
    <div className="min-h-screen bg-dark-darker relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[100]">
          <div className="text-6xl animate-bounce">🎉✨</div>
        </div>
      )}
      {/* Toast Container */}
      <div id="toast-root">
        {/* react-hot-toast will mount here */}
      </div>
      {/* Top Navigation Bar */}
      <nav className="bg-dark-lighter border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-orbitron font-bold text-white">FanVerse</h1>
            </div>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search FanVerse..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="glass-card p-6 sticky top-24">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-light to-accent flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-orbitron text-white">Welcome Back!</h2>
                  <p className="text-gray-400">@username</p>
                </div>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'feed' ? 'bg-primary-light/20 text-primary-light' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Star className="w-5 h-5" />
                  <span>Feed</span>
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'preferences' ? 'bg-primary-light/20 text-primary-light' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span>Preferences</span>
                </button>
                <button
                  onClick={() => setActiveTab('market')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'market' ? 'bg-primary-light/20 text-primary-light' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Market</span>
                </button>
                <button
                  onClick={() => setActiveTab('friends')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'friends' ? 'bg-primary-light/20 text-primary-light' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Friends</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-primary-light/20 text-primary-light' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {/* Create Post */}
                <div className="glass-card p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-light to-accent flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="flex-1 bg-dark-lighter text-gray-400 text-left rounded-lg px-4 py-2 hover:bg-dark-darker transition-colors"
                    >
                      Create a post...
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-light transition-colors">
                      <Image className="w-5 h-5" />
                      <span>Image</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-light transition-colors">
                      <Video className="w-5 h-5" />
                      <span>Video</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-light transition-colors">
                      <Link className="w-5 h-5" />
                      <span>Link</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-light transition-colors">
                      <Smile className="w-5 h-5" />
                      <span>Emoji</span>
                    </button>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="glass-card p-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSortBy('hot')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        sortBy === 'hot' ? 'bg-primary-light text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Hot
                    </button>
                    <button
                      onClick={() => setSortBy('new')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        sortBy === 'new' ? 'bg-primary-light text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      New
                    </button>
                    <button
                      onClick={() => setSortBy('top')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        sortBy === 'top' ? 'bg-primary-light text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Top
                    </button>
                  </div>
                </div>

                {/* Posts */}
                <AnimatePresence>
                  {posts.map((post) => (
        <motion.div
                      key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="glass-card overflow-hidden"
                    >
                      {/* Post Header */}
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-light to-accent flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{post.author}</h3>
                            <p className="text-gray-400 text-sm">{post.timestamp}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Post Content */}
                      <div className="px-4">
                        <p className="text-gray-300 mb-4">{post.content}</p>
                        {post.image && (
                          <div className="relative aspect-video mb-4">
                            <img
                              src={post.image}
                              alt="Post content"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>

                      {/* Post Actions */}
                      <div className="px-4 py-3 border-t border-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleVote(post.id, 'up')}
                                className="text-gray-400 hover:text-primary-light transition-colors"
                              >
                                <ChevronUp className="w-5 h-5" />
                              </button>
                              <span className="text-gray-300">{post.upvotes - post.downvotes}</span>
                              <button
                                onClick={() => handleVote(post.id, 'down')}
                                className="text-gray-400 hover:text-primary-light transition-colors"
                              >
                                <ChevronDown className="w-5 h-5" />
                              </button>
                            </div>
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-light transition-colors">
                              <MessageSquare className="w-5 h-5" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-light transition-colors">
                              <Share2 className="w-5 h-5" />
                              <span>Share</span>
                            </button>
                          </div>
                          <button className="text-gray-400 hover:text-primary-light transition-colors">
                            <Bookmark className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="px-4 py-3 border-t border-gray-800">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-primary-light/20 text-primary-light rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {activeTab === 'market' && (
              <div className="space-y-6">
                {/* Market Header */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-orbitron text-white">Marketplace</h2>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center space-x-2 px-4 py-2 bg-dark-lighter text-white rounded-lg hover:bg-dark-darker transition-colors"
                      >
                        <Filter className="w-5 h-5" />
                        <span>Filters</span>
                      </button>
                      <button
                        onClick={() => setShowSellModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Sell Item</span>
                      </button>
                    </div>
                  </div>

                  {/* Filters */}
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-4 p-4 bg-dark-lighter rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Category
                            </label>
                            <select
                              value={selectedCategory}
                              onChange={(e) => setSelectedCategory(e.target.value)}
                              className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                            >
                              <option value="all">All Categories</option>
                              <option value="gaming">Gaming</option>
                              <option value="movies">Movies</option>
                              <option value="anime">Anime</option>
                              <option value="cartoons">Cartoons</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Price Range
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                placeholder="Min"
                                className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                              />
                              <span className="text-gray-400">-</span>
                              <input
                                type="number"
                                placeholder="Max"
                                className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Condition
                            </label>
                            <select className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light">
                              <option value="all">All Conditions</option>
                              <option value="new">New</option>
                              <option value="like-new">Like New</option>
                              <option value="good">Good</option>
                              <option value="fair">Fair</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Shipping
                            </label>
                            <select className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light">
                              <option value="all">All Options</option>
                              <option value="free">Free Shipping</option>
                              <option value="paid">Paid Shipping</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Market Items Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {marketItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-transform"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="relative aspect-square">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <span className="px-2 py-1 bg-primary-light/20 text-primary-light rounded-full text-sm">
                            {item.condition}
                          </span>
                          {item.shipping === 'free' && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                              Free Shipping
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-medium mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-primary-light font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-gray-400 text-sm">by {item.seller}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-400 text-sm">{item.location}</span>
                          <div className="flex items-center space-x-4 text-gray-400 text-sm">
                            <span>{item.views} views</span>
                            <span>{item.favorites} favorites</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-primary-light/20 text-primary-light rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
              ))}
            </div>
              </div>
            )}

            {/* Keep existing preferences, friends, and settings tabs */}
            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-orbitron text-white">Your Preferences</h2>
                  {!isEditing && (
                    <button
                      onClick={handleEditPreferences}
                      className="flex items-center px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors"
                    >
                      <Edit2 className="w-5 h-5 mr-2" />
                      Edit Preferences
                    </button>
                  )}
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                    {error}
                  </div>
                )}

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Games
                        </label>
                        <input
                          type="text"
                          value={preferences.games.join(', ')}
                          onChange={(e) => handlePreferenceChange('games', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                          placeholder="Enter games separated by commas"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Movies & Series
                        </label>
                        <input
                          type="text"
                          value={preferences.movies_series.join(', ')}
                          onChange={(e) => handlePreferenceChange('movies_series', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                          placeholder="Enter movies/series separated by commas"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Anime
                        </label>
                        <input
                          type="text"
                          value={preferences.anime.join(', ')}
                          onChange={(e) => handlePreferenceChange('anime', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                          placeholder="Enter anime separated by commas"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Cartoons
                        </label>
                        <input
                          type="text"
                          value={preferences.cartoons.join(', ')}
                          onChange={(e) => handlePreferenceChange('cartoons', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                          placeholder="Enter cartoons separated by commas"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSavePreferences(preferences)}
                        className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Games</h3>
                      <div className="flex flex-wrap gap-2">
                        {preferences.games.map((game, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-light/20 text-primary-light rounded-full text-sm"
                          >
                            {game}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Movies & Series</h3>
                      <div className="flex flex-wrap gap-2">
                        {preferences.movies_series.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-light/20 text-primary-light rounded-full text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Anime</h3>
                      <div className="flex flex-wrap gap-2">
                        {preferences.anime.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-light/20 text-primary-light rounded-full text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Cartoons</h3>
                      <div className="flex flex-wrap gap-2">
                        {preferences.cartoons.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-light/20 text-primary-light rounded-full text-sm"
                          >
                            {item}
                          </span>
              ))}
            </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'friends' && (
            <div className="glass-card p-6">
                <h2 className="text-2xl font-orbitron text-white mb-6">Friends</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((friend) => (
                    <div key={friend} className="flex items-center space-x-4 p-4 bg-dark-lighter rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-light to-accent flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Friend {friend}</h3>
                        <p className="text-gray-400 text-sm">Online</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="glass-card p-6">
                <h2 className="text-2xl font-orbitron text-white mb-6">Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Notification Settings
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="form-checkbox text-primary-light" />
                        <span className="text-gray-300">Email Notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="form-checkbox text-primary-light" />
                        <span className="text-gray-300">Push Notifications</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Privacy Settings
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="form-checkbox text-primary-light" />
                        <span className="text-gray-300">Public Profile</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="form-checkbox text-primary-light" />
                        <span className="text-gray-300">Show Online Status</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="glass-card p-6 sticky top-24">
                <h2 className="text-xl font-orbitron text-white mb-4">Trending Topics</h2>
                <div className="space-y-4">
                  {['#Gaming', '#Movies', '#Anime', '#Cartoons'].map((topic) => (
                    <div key={topic} className="flex items-center justify-between">
                      <span className="text-primary-light">{topic}</span>
                      <span className="text-gray-400 text-sm">1.2k posts</span>
                </div>
              ))}
            </div>
              </div>

              {/* Market Stats */}
              {activeTab === 'market' && (
                <div className="glass-card p-6">
                  <h2 className="text-xl font-orbitron text-white mb-4">Market Stats</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Active Listings</span>
                      <span className="text-primary-light">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Sales</span>
                      <span className="text-primary-light">$45,678</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Average Price</span>
                      <span className="text-primary-light">$37.02</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
            </div>
          </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-lighter rounded-lg w-full max-w-2xl mx-4"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-orbitron text-white">Create Post</h2>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-light to-accent flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Your Name</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedPostType('text')}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedPostType === 'text'
                              ? 'bg-primary-light text-white'
                              : 'bg-dark-darker text-gray-400'
                          }`}
                        >
                          Text
                        </button>
                        <button
                          onClick={() => setSelectedPostType('image')}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedPostType === 'image'
                              ? 'bg-primary-light text-white'
                              : 'bg-dark-darker text-gray-400'
                          }`}
                        >
                          Image
                        </button>
                        <button
                          onClick={() => setSelectedPostType('video')}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedPostType === 'video'
                              ? 'bg-primary-light text-white'
                              : 'bg-dark-darker text-gray-400'
                          }`}
                        >
                          Video
                        </button>
                      </div>
                    </div>
                  </div>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full h-32 bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light resize-none"
                  />
                  {selectedPostType !== 'text' && (
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <Image className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-400">
                          {selectedPostType === 'image'
                            ? 'Drop your image here or click to upload'
                            : 'Drop your video here or click to upload'}
                        </p>
                        <button className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors">
                          Upload {selectedPostType === 'image' ? 'Image' : 'Video'}
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowCreatePost(false)}
                      className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreatePost}
                      className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Item Details Modal */}
      <AnimatePresence>
        {showItemDetails && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-lighter rounded-lg w-full max-w-4xl mx-4"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-orbitron text-white">Item Details</h2>
                  <button
                    onClick={() => setShowItemDetails(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative aspect-square">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2">{selectedItem.title}</h3>
                      <p className="text-gray-300">{selectedItem.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-medium text-primary-light">
                        ${selectedItem.price.toFixed(2)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-primary-light/20 text-primary-light rounded-full text-sm">
                          {selectedItem.condition}
                        </span>
                        {selectedItem.shipping === 'free' && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                            Free Shipping
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Seller Information</h4>
                        <p className="text-white">{selectedItem.seller}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Location</h4>
                        <p className="text-white">{selectedItem.location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Category</h4>
                        <p className="text-white capitalize">{selectedItem.category}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-light/20 text-primary-light rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="flex-1 px-6 py-3 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors">
                        Buy Now
                      </button>
                      <button className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sell Item Modal */}
      <AnimatePresence>
        {showSellModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-lighter rounded-lg w-full max-w-2xl mx-4"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-orbitron text-white">Sell an Item</h2>
                  <button
                    onClick={() => setShowSellModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                      placeholder="Enter item title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="w-full h-32 bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light resize-none"
                      placeholder="Describe your item"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-2 text-gray-400">$</span>
                        <input
                          type="number"
                          value={newItem.price}
                          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                          className="w-full bg-dark-darker text-white rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                      >
                        <option value="gaming">Gaming</option>
                        <option value="movies">Movies</option>
                        <option value="anime">Anime</option>
                        <option value="cartoons">Cartoons</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Condition
                      </label>
                      <select
                        value={newItem.condition}
                        onChange={(e) => setNewItem({ ...newItem, condition: e.target.value as any })}
                        className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                      >
                        <option value="new">New</option>
                        <option value="like-new">Like New</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Shipping
                      </label>
                      <select
                        value={newItem.shipping}
                        onChange={(e) => setNewItem({ ...newItem, shipping: e.target.value as any })}
                        className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                      >
                        <option value="free">Free Shipping</option>
                        <option value="paid">Paid Shipping</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newItem.location}
                      onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      className="w-full bg-dark-darker text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                      placeholder="Enter your location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Images
                    </label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <Image className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-400">
                          Drop your images here or click to upload
                        </p>
                        <button className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors">
                          Upload Images
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowSellModal(false)}
                      className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSellItem}
                      className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary transition-colors"
                    >
                      List Item
                    </button>
              </div>
            </div>
          </div>
        </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard; 