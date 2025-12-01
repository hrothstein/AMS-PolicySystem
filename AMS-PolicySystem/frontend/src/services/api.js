import axios from 'axios';

// Use relative URL in production, localhost in development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api/v1' : 'http://localhost:3001/api/v1');

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// Policyholders API
export const policyholdersAPI = {
  getAll: () => api.get('/policyholders'),
  getById: (id) => api.get(`/policyholders/${id}`),
  getPolicies: (id) => api.get(`/policyholders/${id}/policies`),
  create: (data) => api.post('/policyholders', data),
  update: (id, data) => api.put(`/policyholders/${id}`, data),
  delete: (id) => api.delete(`/policyholders/${id}`),
};

// Policies API
export const policiesAPI = {
  getAll: () => api.get('/policies'),
  getById: (id) => api.get(`/policies/${id}`),
  create: (data) => api.post('/policies', data),
  update: (id, data) => api.put(`/policies/${id}`, data),
  delete: (id) => api.delete(`/policies/${id}`),
};

// Drivers API
export const driversAPI = {
  getByPolicyId: (policyId) => api.get(`/policies/${policyId}/drivers`),
  getById: (policyId, driverId) => api.get(`/policies/${policyId}/drivers/${driverId}`),
  create: (policyId, data) => api.post(`/policies/${policyId}/drivers`, data),
  update: (policyId, driverId, data) => api.put(`/policies/${policyId}/drivers/${driverId}`, data),
  delete: (policyId, driverId) => api.delete(`/policies/${policyId}/drivers/${driverId}`),
};

// Claims API
export const claimsAPI = {
  getAll: () => api.get('/claims'),
  getById: (id) => api.get(`/claims/${id}`),
  getByPolicyId: (policyId) => api.get(`/claims/policy/${policyId}`),
  create: (data) => api.post('/claims', data),
  update: (id, data) => api.put(`/claims/${id}`, data),
  delete: (id) => api.delete(`/claims/${id}`),
};

export default api;
