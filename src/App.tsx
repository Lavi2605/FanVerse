import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Preferences from './pages/Preferences';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import { Toaster } from 'react-hot-toast';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode; isDarkMode: boolean; toggleDarkMode: () => void }> = ({ children, isDarkMode, toggleDarkMode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/signin" />;
  }
  // Pass props down to children. Assuming children is a single element.
  return React.cloneElement(children as React.ReactElement, { isDarkMode, toggleDarkMode });
};

const App: React.FC = () => {
  // Initialize dark mode from localStorage, default to true
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true; // Default to dark mode
  });

  // Apply dark class to html element and update localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode: boolean) => !prevMode);
  };

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/preferences"
          element={
            <ProtectedRoute isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
              <Preferences />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
              <Dashboard isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
              <Messages isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;