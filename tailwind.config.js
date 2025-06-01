/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6d28d9',
          light: '#8b5cf6',
          dark: '#5b21b6',
        },
        secondary: {
          DEFAULT: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0369a1',
        },
        accent: {
          DEFAULT: '#f43f5e',
          light: '#fb7185',
          dark: '#e11d48',
        },
        dark: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
          darker: '#020617',
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'floating 3s ease-in-out infinite',
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg')",
      },
    },
  },
  plugins: [],
};