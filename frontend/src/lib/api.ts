import axios from 'axios';
import { User, TokenResponse } from '../components/Auth/types/models'; // Import User and TokenResponse types

const baseURL = import.meta.env.VITE_API_BASE_URL; // Your backend API URL

const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

export const register = async (userData: User): Promise<User> => {
  const { data } = await authApi.post('/api/v1/users/signup', userData);
  return data;
};

export const login = async (email: string, password: string): Promise<TokenResponse> => {
  const { data } = await authApi.post('/api/v1/users/signin', { email, password });
  return data;
};

export const logout = async (): Promise<void> => {
  try {
    await authApi.get('/api/v1/users/logout');
    clearLocalStorage(); // Clear local storage after logout
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const relogin = async (): Promise<TokenResponse> => {
  const { data } = await authApi.get('/api/v1/users/refresh/token');
  return data;
};

// Helper function to clear local storage
const clearLocalStorage = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
};

export default authApi;
