// src/api.js
import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: 'http://localhost:8001', // Your backend server URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for JWT token
API.interceptors.request.use((req) => {
  // Get token from localStorage where we stored it during login
  const token = localStorage.getItem('token');

  // If token exists, add it to the Authorization header
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error statuses
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access (token expired, etc.)
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden access
          console.error('Forbidden: You don\'t have permission to access this resource');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
      }
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const AuthAPI = {
  signup: (userData) => API.post('/auth/signup', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  googleLogin: (token) => API.post('/auth/google', { token }),
};

export const UrlAPI = {
  shorten: (longUrl) => API.post('/url', { url: longUrl }),
  getUserUrls: () => API.get('/url/user'),
  getUrlAnalytics: (shortId) => API.get(`/url/${shortId}`),
  updateLink: (shortId, data) => API.patch(`/url/${shortId}`, data),
};

export default API;
