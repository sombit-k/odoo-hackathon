// Test component to demonstrate all store functionality
import React, { useEffect, useState } from 'react';
import { useItemStore, useUserStore, useCategoryStore } from '@/store';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/useAuthStore';

const StoreTest = () => {
  const { getToken, isSignedIn } = useAuthStore();
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Item store
  const { 
    items, 
    item,
    loading: itemLoading,
    error: itemError,
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
    searchItems,
    filterItemsByCategory,
    clearError: clearItemError,
    reset: resetItemStore
  } = useItemStore();

  // User store
  const {
    user,
    loading: userLoading,
    error: userError,
    saveUser,
    clearError: clearUserError,
    reset: resetUserStore
  } = useUserStore();

  // Category store
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
    fetchCategories,
    getActiveCategories,
    clearError: clearCategoryError,
    reset: resetCategoryStore
  } = useCategoryStore();

  const addTestResult = (test, status, message) => {
    setTestResults(prev => [...prev, { test, status, message, timestamp: new Date() }]);
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    try {
      // Test 1: Category Store
      addTestResult('fetchCategories', 'running', 'Fetching categories...');
      try {
        await fetchCategories();
        addTestResult('fetchCategories', 'success', `Fetched ${categories.length} categories`);
      } catch (error) {
        addTestResult('fetchCategories', 'error', error.message);
      }

      // Test 2: Item Store
      addTestResult('fetchItems', 'running', 'Fetching items...');
      try {
        await fetchItems();
        addTestResult('fetchItems', 'success', `Fetched ${items.length} items`);
      } catch (error) {
        addTestResult('fetchItems', 'error', error.message);
      }

      // Test 3: User Store (if signed in)
      if (isSignedIn) {
        addTestResult('saveUser', 'running', 'Saving user...');
        try {
          const token = await getToken();
          await saveUser(token);
          addTestResult('saveUser', 'success', `User saved: ${user?.firstName || 'Unknown'}`);
        } catch (error) {
          addTestResult('saveUser', 'error', error.message);
        }
      } else {
        addTestResult('saveUser', 'skipped', 'User not signed in');
      }

      // Test 4: Create Item (mock data)
      addTestResult('createItem', 'running', 'Creating test item...');
      try {
        const mockItem = {
          title: 'Test Item',
          description: 'This is a test item created from the store test',
          category: categories[0]?._id || '507f1f77bcf86cd799439011', // Use first category or mock ID
          type: 'both',
          size: 'M',
          condition: 'Good',
          images: ['https://via.placeholder.com/300'],
          tags: ['test', 'store'],
          pointsValue: 10
        };
        
        const createdItem = await createItem(mockItem);
        addTestResult('createItem', 'success', `Created item: ${createdItem.title}`);
        
        // Test 5: Update the created item
        addTestResult('updateItem', 'running', 'Updating test item...');
        try {
          const updatedItem = await updateItem(createdItem._id, {
            ...mockItem,
            title: 'Updated Test Item',
            description: 'This item has been updated'
          });
          addTestResult('updateItem', 'success', `Updated item: ${updatedItem.title}`);
          
          // Test 6: Delete the created item
          addTestResult('deleteItem', 'running', 'Deleting test item...');
          try {
            await deleteItem(createdItem._id);
            addTestResult('deleteItem', 'success', 'Item deleted successfully');
          } catch (error) {
            addTestResult('deleteItem', 'error', error.message);
          }
        } catch (error) {
          addTestResult('updateItem', 'error', error.message);
        }
      } catch (error) {
        addTestResult('createItem', 'error', error.message);
      }

      // Test 7: Search functionality
      addTestResult('searchItems', 'running', 'Testing search...');
      try {
        const searchResults = searchItems('test');
        addTestResult('searchItems', 'success', `Found ${searchResults.length} items matching "test"`);
      } catch (error) {
        addTestResult('searchItems', 'error', error.message);
      }

      // Test 8: Filter functionality
      addTestResult('filterItems', 'running', 'Testing filter...');
      try {
        const filteredItems = filterItemsByCategory(categories[0]?._id);
        addTestResult('filterItems', 'success', `Found ${filteredItems.length} items in first category`);
      } catch (error) {
        addTestResult('filterItems', 'error', error.message);
      }

    } catch (error) {
      addTestResult('general', 'error', `Test suite failed: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearAllErrors = () => {
    clearItemError();
    clearUserError();
    clearCategoryError();
  };

  const resetAllStores = () => {
    resetItemStore();
    resetUserStore();
    resetCategoryStore();
    toast.success('All stores reset');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'running': return 'text-blue-600';
      case 'skipped': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Zustand Store Test Suite</h1>
      
      {/* Store Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">Item Store</h3>
          <p className="text-sm text-blue-600">Items: {items.length}</p>
          <p className="text-sm text-blue-600">Loading: {itemLoading ? 'Yes' : 'No'}</p>
          {itemError && <p className="text-sm text-red-600">Error: {itemError}</p>}
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">User Store</h3>
          <p className="text-sm text-green-600">User: {user?.firstName || 'Not loaded'}</p>
          <p className="text-sm text-green-600">Loading: {userLoading ? 'Yes' : 'No'}</p>
          {userError && <p className="text-sm text-red-600">Error: {userError}</p>}
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">Category Store</h3>
          <p className="text-sm text-purple-600">Categories: {categories.length}</p>
          <p className="text-sm text-purple-600">Loading: {categoryLoading ? 'Yes' : 'No'}</p>
          {categoryError && <p className="text-sm text-red-600">Error: {categoryError}</p>}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isRunning ? 'Running Tests...' : 'Run All Tests'}
        </button>
        
        <button
          onClick={clearAllErrors}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Clear All Errors
        </button>
        
        <button
          onClick={resetAllStores}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset All Stores
        </button>
      </div>

      {/* Individual Test Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => fetchCategories()}
          className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
        >
          Fetch Categories
        </button>
        
        <button
          onClick={() => fetchItems()}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          Fetch Items
        </button>
        
        <button
          onClick={async () => {
            if (isSignedIn) {
              const token = await getToken();
              saveUser(token);
            } else {
              toast.error('Please sign in first');
            }
          }}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
        >
          Save User
        </button>
        
        <button
          onClick={() => {
            const results = searchItems('test');
            toast.success(`Found ${results.length} items`);
          }}
          className="bg-indigo-500 text-white px-3 py-1 rounded text-sm hover:bg-indigo-600"
        >
          Search "test"
        </button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-4">Test Results</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{result.test}</span>
                  <span className={`text-sm ${getStatusColor(result.status)}`}>
                    [{result.status.toUpperCase()}]
                  </span>
                </div>
                <span className="text-sm text-gray-600">{result.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Data Display */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Current Items ({items.length})</h3>
          <div className="max-h-40 overflow-y-auto">
            {items.slice(0, 5).map(item => (
              <div key={item._id} className="text-sm p-2 border-b">
                <div className="font-medium">{item.title}</div>
                <div className="text-gray-600">{item.condition} • {item.type}</div>
              </div>
            ))}
            {items.length > 5 && (
              <div className="text-sm text-gray-500 p-2">
                ... and {items.length - 5} more items
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Current Categories ({categories.length})</h3>
          <div className="max-h-40 overflow-y-auto">
            {categories.slice(0, 5).map(category => (
              <div key={category._id} className="text-sm p-2 border-b">
                <div className="font-medium">{category.name}</div>
                <div className="text-gray-600">{category.description}</div>
              </div>
            ))}
            {categories.length > 5 && (
              <div className="text-sm text-gray-500 p-2">
                ... and {categories.length - 5} more categories
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreTest;
