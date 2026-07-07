import axios from 'axios';

const api = axios.create({
  baseURL: '', // Using Vite dev server proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eafc_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and user on session expiration
      localStorage.removeItem('eafc_token');
      localStorage.removeItem('eafc_user');
      // Optional: reload page to reset app state if needed
    }
    return Promise.reject(error);
  }
);

export default api;
