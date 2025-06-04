import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { registerUser } from '../services/auth';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    country: '',
    address: '',
    phone: '',
    preferences: {
      anime: false,
      cartoon: false,
      webSeries: false,
      movies: false,
      songs: false,
      raps: false,
      comics: false,
      manga: false,
      others: false
    },
    customPreferences: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checkbox.checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Prepare preferences as an array of selected keys
      const preferences = Object.keys(formData.preferences).filter(
        key => formData.preferences[key as keyof typeof formData.preferences]
      );

      // Prepare the payload
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        age: formData.age,
        country: formData.country,
        address: formData.address,
        phone: formData.phone,
        preferences,
        customPreferences: formData.customPreferences
      };

      const res = await registerUser(payload);
      if (res.success) {
        localStorage.setItem('userId', res.userId);
        navigate('/preferences');
      } else {
        setError(res.error || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-dark-darker flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary-light via-secondary to-accent opacity-10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-2xl p-8 relative z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <h2 className="text-3xl font-orbitron font-bold text-center mb-8 text-white">
          Join FanVerse
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>

          {/* Preferences Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Preferences
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="anime"
                  checked={formData.preferences.anime}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                />
                <label className="text-gray-300">Anime</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="cartoon"
                  checked={formData.preferences.cartoon}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                />
                <label className="text-gray-300">Cartoon</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="webSeries"
                  checked={formData.preferences.webSeries}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                />
                <label className="text-gray-300">Web Series</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="movies"
                  checked={formData.preferences.movies}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                />
                <label className="text-gray-300">Movies</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="songs"
                  checked={formData.preferences.songs}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                />
                <label className="text-gray-300">Songs</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="raps"
                  checked={formData.preferences.raps}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                />
                <label className="text-gray-300">Raps</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="comics"
                  checked={formData.preferences.comics}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                />
                <label className="text-gray-300">Comics</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="manga"
                  checked={formData.preferences.manga}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                />
                <label className="text-gray-300">Manga</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="others"
                  checked={formData.preferences.others}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
                />
                <label className="text-gray-300">Others</label>
              </div>
            </div>
            
            {formData.preferences.others && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Specify Other Preferences
                </label>
                <input
                  type="text"
                  name="customPreferences"
                  value={formData.customPreferences}
                  onChange={handleChange}
                  placeholder="Enter your other preferences"
                  className="w-full px-4 py-2 rounded-lg bg-dark-lighter border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-primary-light via-secondary to-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary-light hover:text-primary transition-colors">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp; 