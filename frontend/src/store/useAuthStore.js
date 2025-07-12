import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Login action
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/login", credentials);
          const { user, token } = response.data;
          
          // Store token in localStorage
          localStorage.setItem('token', token);
          
          // Set axios default header
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          set({ 
            user, 
            isAuthenticated: true, 
            loading: false,
            error: null 
          });
          
          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ 
            error: errorMessage, 
            loading: false,
            isAuthenticated: false,
            user: null 
          });
          throw error;
        }
      },

      // Signup action
      signup: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/signup", userData);
          const { user, token } = response.data;
          
          // Store token in localStorage
          localStorage.setItem('token', token);
          
          // Set axios default header
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          set({ 
            user, 
            isAuthenticated: true, 
            loading: false,
            error: null 
          });
          
          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Signup failed';
          set({ 
            error: errorMessage, 
            loading: false,
            isAuthenticated: false,
            user: null 
          });
          throw error;
        }
      },

      // Logout action
      logout: async () => {
        set({ loading: true });
        try {
          await axiosInstance.post("/logout");
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          // Clear everything regardless of API call success
          localStorage.removeItem('token');
          delete axiosInstance.defaults.headers.common['Authorization'];
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            loading: false,
            error: null 
          });
        }
      },

      // Check if user is authenticated (called on app start)
      checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        set({ loading: true });
        try {
          // Set axios default header
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token with backend
          const response = await axiosInstance.get("/me");
          
          set({ 
            user: response.data, 
            isAuthenticated: true, 
            loading: false,
            error: null 
          });
        } catch (error) {
          // Token is invalid, clear everything
          localStorage.removeItem('token');
          delete axiosInstance.defaults.headers.common['Authorization'];
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            loading: false,
            error: null 
          });
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Reset store
      reset: () => {
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;
