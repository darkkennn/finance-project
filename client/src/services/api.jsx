import axios from 'axios';

// Create a new instance of axios with a base URL
const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Use an interceptor to add the auth token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;