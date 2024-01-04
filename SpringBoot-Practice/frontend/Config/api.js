

import axios from 'axios';

export const API_BASE_URL="http://localhost:9090";

// Create an instance of Axios with custom configuration
const api = axios.create({
  baseURL: 'http://localhost:9090', // Replace with your API base URL
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json', // Set default headers (optional)
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;