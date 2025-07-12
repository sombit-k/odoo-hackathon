import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

const useCategoryStore = create((set, get) => ({
  // State
  categories: [],
  category: null,
  loading: false,
  error: null,
  
  // Actions
  
  // Get all categories
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/categories');
      set({ categories: response.data, loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch categories';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Get category by ID
  fetchCategoryById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/categories/${id}`);
      set({ category: response.data, loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch category';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Create new category (admin only)
  createCategory: async (categoryData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/categories', categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newCategory = response.data;
      
      // Add the new category to the categories array
      set(state => ({
        categories: [...state.categories, newCategory],
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

  // Update category (admin only)
  updateCategory: async (id, categoryData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/categories/${id}`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedCategory = response.data;
      
      // Update the category in the categories array
      set(state => ({
        categories: state.categories.map(category => 
          category._id === id ? updatedCategory : category
        ),
        category: state.category?._id === id ? updatedCategory : state.category,
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

  // Delete category (admin only)
  deleteCategory: async (id, token) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Remove the category from the categories array
      set(state => ({
        categories: state.categories.filter(category => category._id !== id),
        category: state.category?._id === id ? null : state.category,
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

  // Get active categories only
  getActiveCategories: () => {
    const { categories } = get();
    return categories.filter(category => category.isActive);
  },

  // Get categories by parent category
  getCategoriesByParent: (parentId) => {
    const { categories } = get();
    return categories.filter(category => category.parentCategory === parentId);
  },

  // Clear current category
  clearCurrentCategory: () => {
    set({ category: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  reset: () => {
    set({
      categories: [],
      category: null,
      loading: false,
      error: null,
    });
  },
}));

export default useCategoryStore;
