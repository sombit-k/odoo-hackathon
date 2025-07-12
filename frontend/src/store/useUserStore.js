import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

const useUserStore = create((set, get) => ({
  // State
  user: null,
  loading: false,
  error: null,
  
  // Actions
  
  // Save user to backend (called when user signs in)
  saveUser: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        '/save-user',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      set({ user: response.data.user, loading: false });
      toast.success('User saved successfully!');
      return response.data.user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to save user';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to get user';
      set({ error: errorMessage, loading: false });
      // Don't show toast for this error as it might be called frequently
      throw error;
    }
  },

  // Update user profile
  updateUser: async (userData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put('/user', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
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
