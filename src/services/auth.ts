import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable
const API_URL = 'http://localhost:3001/api';

export const registerUser = async (userData: any) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Login failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const savePreferences = async (userId: number, preferences: any) => {
  try {
    const response = await fetch(`${API_URL}/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, preferences }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to save preferences');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getPreferences = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}/preferences/${userId}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get preferences');
    }

    return data.preferences;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  window.location.href = '/signin';
}; 