import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { loginUser } from '../services/auth';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const { token, user } = await loginUser(formData.email, formData.password);
      
      // Store token and user ID
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id.toString());
      
      // Check if user has preferences
      const hasPreferences = user.has_preferences;
      
      // Redirect based on whether user has preferences
      if (hasPreferences) {
        navigate('/dashboard');
      } else {
        navigate('/preferences');
      }
    } catch (error) {
      setError('Invalid email or password');
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
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <h2 className="text-3xl font-orbitron font-bold text-center mb-8 text-white">
          Welcome Back
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-700 text-primary-light focus:ring-primary-light"
              />
              <label className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-primary-light hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-primary-light via-secondary to-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-light hover:text-primary transition-colors">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn; 