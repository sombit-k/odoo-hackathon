import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));

export default useAuthStore;
