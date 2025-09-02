import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
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
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
  
  logout: () =>
    api.post('/auth/logout'),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
};

// Lesson API
export const lessonAPI = {
  getModules: () =>
    api.get('/lessons/modules'),
  
  getModule: (moduleId: string) =>
    api.get(`/lessons/modules/${moduleId}`),
  
  getLesson: (moduleId: string, lessonId: string) =>
    api.get(`/lessons/modules/${moduleId}/lessons/${lessonId}`),
  
  getExercise: (moduleId: string, exerciseId: string) =>
    api.get(`/lessons/modules/${moduleId}/exercises/${exerciseId}`),
  
  getProject: (moduleId: string, projectId: string) =>
    api.get(`/lessons/modules/${moduleId}/projects/${projectId}`),
  
  runTests: (code: string, tests: any[]) =>
    api.post('/lessons/run-tests', { code, tests }),
  
  submitExercise: (moduleId: string, exerciseId: string, code: string, testResults: any[]) =>
    api.post(`/lessons/modules/${moduleId}/exercises/${exerciseId}/submit`, { code, testResults }),
  
  submitProject: (moduleId: string, projectId: string, code: string, testResults: any[]) =>
    api.post(`/lessons/modules/${moduleId}/projects/${projectId}/submit`, { code, testResults }),
  
  getHint: (moduleId: string, exerciseId: string, hintIndex: number) =>
    api.get(`/lessons/modules/${moduleId}/exercises/${exerciseId}/hints/${hintIndex}`),
};

// Progress API
export const progressAPI = {
  getUserProgress: () =>
    api.get('/progress'),
  
  updateProgress: (progressData: any) =>
    api.put('/progress', progressData),
  
  completeLesson: (moduleId: string, lessonId: string, timeSpent: number) =>
    api.post('/progress/lessons', { moduleId, lessonId, timeSpent }),
  
  completeExercise: (moduleId: string, exerciseId: string, code: string, testResults: any[], timeSpent: number, attempts: number) =>
    api.post('/progress/exercises', { moduleId, exerciseId, code, testResults, timeSpent, attempts }),
  
  completeProject: (moduleId: string, projectId: string, code: string, testResults: any[], timeSpent: number) =>
    api.post('/progress/projects', { moduleId, projectId, code, testResults, timeSpent }),
  
  getLeaderboard: () =>
    api.get('/progress/leaderboard'),
  
  getAchievements: () =>
    api.get('/progress/achievements'),
  
  getStats: () =>
    api.get('/progress/stats'),
};

// User API
export const userAPI = {
  getProfile: () =>
    api.get('/users/profile'),
  
  updateProfile: (userData: any) =>
    api.put('/users/profile', userData),
  
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put('/users/password', { currentPassword, newPassword }),
  
  deleteAccount: () =>
    api.delete('/users/account'),
};

// Blockchain API
export const blockchainAPI = {
  getNetworkInfo: () =>
    api.get('/blockchain/network'),
  
  deployContract: (contractCode: string, constructorArgs: any[]) =>
    api.post('/blockchain/deploy', { contractCode, constructorArgs }),
  
  callContract: (contractAddress: string, method: string, args: any[]) =>
    api.post('/blockchain/call', { contractAddress, method, args }),
  
  getTransaction: (txHash: string) =>
    api.get(`/blockchain/transactions/${txHash}`),
  
  getBalance: (address: string) =>
    api.get(`/blockchain/balance/${address}`),
  
  sendTransaction: (to: string, amount: string, data?: string) =>
    api.post('/blockchain/send', { to, amount, data }),
};

// Code Execution API
export const codeExecutionAPI = {
  executeJavaScript: (code: string) =>
    api.post('/code/execute/javascript', { code }),
  
  executeSolidity: (code: string, testCases: any[]) =>
    api.post('/code/execute/solidity', { code, testCases }),
  
  validateCode: (code: string, language: string) =>
    api.post('/code/validate', { code, language }),
  
  formatCode: (code: string, language: string) =>
    api.post('/code/format', { code, language }),
};

export default api;
