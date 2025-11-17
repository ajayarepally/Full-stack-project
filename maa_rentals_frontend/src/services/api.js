
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://maa-rentals.onrender.com/',
});

// Add token to each request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
