import axios from 'axios';

const API_KEY = import.meta.env.VITE_FRUIT_API_KEY;
const BASE_URL = import.meta.env.VITE_FRUIT_BASE_URL;

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  apiClient.interceptors.request.use(
    (config) => {
      if (!config.headers['x-api-key']) {
        config.headers['x-api-key'] = API_KEY;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );