import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

const useUserStore = create((set, get) => ({
  // State
  user: null,
  loading: false,
  error: null,
  
  // Actions
  
  // Get current user (using auth/me endpoint)
  getCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/auth/me');
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to get user';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Update user profile
  updateUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put('/user', userData);
      set({ user: response.data, loading: false });
      toast.success('Profile updated successfully!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Clear user data (called when user signs out)
  clearUser: () => {
    set({ user: null, error: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  reset: () => {
    set({
      user: null,
      loading: false,
      error: null,
    });
  },
}));

export default useUserStore;