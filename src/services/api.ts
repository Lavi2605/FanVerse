import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Update if needed
});

export default api;
