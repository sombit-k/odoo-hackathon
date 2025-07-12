import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

// Retrieve token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

const useItemStore = create((set, get) => ({
  // State
  items: [],
  item: null,
  loading: false,
  error: null,
  
  // Actions
  
  // Get all items (public endpoint)
  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/items/all');
      set({ items: response.data, loading: false });
      console.log('Fetched items:', response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch items';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Get user's own items (authenticated endpoint)
  fetchUserItems: async () => {
    set({ loading: true, error: null });
    try {
      const token = getToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please login.');
      }

      const response = await axiosInstance.get('/items', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      set({ items: response.data, loading: false });
      console.log('Fetched user items:', response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch user items';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Get item by ID
  fetchItemById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/items/${id}`);
      set({ item: response.data, loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch item';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Create new item
  createItem: async (itemData) => {
    set({ loading: true, error: null });
    try {
      const token = getToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please login.');
      }

      // Create FormData for file upload
      const formData = new FormData();
      
      // Add text fields
      Object.keys(itemData).forEach(key => {
        if (key !== 'images' && itemData[key] !== null && itemData[key] !== undefined) {
          if (Array.isArray(itemData[key])) {
            itemData[key].forEach(item => formData.append(key, item));
          } else {
            formData.append(key, itemData[key]);
          }
        }
      });

      // Add image files if they exist
      if (itemData.images && itemData.images.length > 0) {
        itemData.images.forEach(image => {
          if (image instanceof File) {
            formData.append('images', image);
          }
        });
      }

      const response = await axiosInstance.post('/items', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const newItem = response.data;
      
      // Add the new item to the items array
      set(state => ({
        items: [...state.items, newItem],
        loading: false
      }));
      
      toast.success('Item created successfully!');
      return newItem;
    } catch (error) {
      console.error('Create item error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create item';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Update item
  updateItem: async (id, itemData) => {
    set({ loading: true, error: null });
    try {
      const token = getToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please login.');
      }

      const response = await axiosInstance.put(`/items/${id}`, itemData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedItem = response.data;
      
      // Update the item in the items array
      set(state => ({
        items: state.items.map(item => 
          item._id === id ? updatedItem : item
        ),
        item: state.item?._id === id ? updatedItem : state.item,
        loading: false
      }));
      
      toast.success('Item updated successfully!');
      return updatedItem;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update item';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Delete item
  deleteItem: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = getToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please login.');
      }

      await axiosInstance.delete(`/items/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Remove the item from the items array
      set(state => ({
        items: state.items.filter(item => item._id !== id),
        item: state.item?._id === id ? null : state.item,
        loading: false
      }));
      
      toast.success('Item deleted successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete item';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Filter items by category
  filterItemsByCategory: (categoryId) => {
    const { items } = get();
    if (!categoryId) return items;
    return items.filter(item => item.category === categoryId);
  },

  // Filter items by type (swap, points, both)
  filterItemsByType: (type) => {
    const { items } = get();
    if (!type) return items;
    return items.filter(item => item.type === type);
  },

  // Search items by title or description
  searchItems: (searchTerm) => {
    const { items } = get();
    if (!searchTerm) return items;
    
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(lowercaseSearchTerm) ||
      item.description.toLowerCase().includes(lowercaseSearchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowercaseSearchTerm))
    );
  },

  // Get items by owner
  getItemsByOwner: (ownerId) => {
    const { items } = get();
    return items.filter(item => item.owner === ownerId);
  },

  // Clear current item
  clearCurrentItem: () => {
    set({ item: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  reset: () => {
    set({
      items: [],
      item: null,
      loading: false,
      error: null,
    });
  },
}));

export default useItemStore;
