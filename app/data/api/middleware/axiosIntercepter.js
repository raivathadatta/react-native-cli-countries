import axios from 'axios';

// Create an instance of axios with default configurations
const axiosInstance = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Modify request config before sending request
    // Example: Add authentication token
    // const token = 'your-auth-token'; // Replace with your logic to get the token
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    console.log('in instance');
    return response;
  },
  error => {
    // Handle response error
    if (error.response) {
      // Example: Show error message if the server responded with a status code
      console.error('API Error:', error.response.data.message);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
