// Example component showing how to use the item store
import React, { useEffect } from 'react';
import { useItemStore } from '@/store';

const ItemList = () => {
  const { 
    items, 
    loading, 
    error, 
    fetchItems, 
    deleteItem,
    searchItems,
    filterItemsByCategory,
    clearError 
  } = useItemStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(id);
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredItems = searchItems(searchTerm);
    console.log('Filtered items:', filteredItems);
  };

  if (loading) return <div>Loading...</div>;
  
  if (error) return (
    <div className="text-red-500">
      Error: {error}
      <button onClick={clearError} className="ml-2 underline">
        Clear Error
      </button>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Items</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items..."
          className="border p-2 rounded"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id} className="border rounded p-4 shadow">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {item.condition}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm ml-2">
                {item.type}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No items found
        </div>
      )}
    </div>
  );
};

export default ItemList;
