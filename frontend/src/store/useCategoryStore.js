import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

const useCategoryStore = create((set, get) => ({
  // State
  categories: [],
  loading: false,
  error: null,
  
  // Actions
  
  // Get all categories
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/categories');
      set({ categories: response.data || [], loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch categories';
      set({ error: errorMessage, loading: false, categories: [] });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Get active categories (helper function)
  getActiveCategories: () => {
    const { categories } = get();
    // Ensure categories is an array before filtering
    if (!Array.isArray(categories)) {
      return [];
    }
    return categories.filter(category => category.isActive !== false);
  },

  // Get category by ID
  getCategoryById: (id) => {
    const { categories } = get();
    if (!Array.isArray(categories)) {
      return null;
    }
    return categories.find(category => category._id === id);
  },

  // Create new category
  createCategory: async (categoryData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/categories', categoryData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newCategory = response.data;
      
      // Add the new category to the categories array
      set(state => ({
        categories: [...(Array.isArray(state.categories) ? state.categories : []), newCategory],
        loading: false
      }));
      
      toast.success('Category created successfully!');
      return newCategory;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create category';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Update category
  updateCategory: async (id, categoryData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(`/categories/${id}`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedCategory = response.data;
      
      // Update the category in the categories array
      set(state => ({
        categories: Array.isArray(state.categories) 
          ? state.categories.map(category => 
              category._id === id ? updatedCategory : category
            )
          : [],
        loading: false
      }));
      
      toast.success('Category updated successfully!');
      return updatedCategory;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update category';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Remove the category from the categories array
      set(state => ({
        categories: Array.isArray(state.categories) 
          ? state.categories.filter(category => category._id !== id)
          : [],
        loading: false
      }));
      
      toast.success('Category deleted successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete category';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  reset: () => {
    set({
      categories: [],
      loading: false,
      error: null,
    });
  },
}));

export default useCategoryStore;

