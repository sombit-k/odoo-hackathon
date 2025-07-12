// Example component showing how to create/update items
import React, { useState, useEffect } from 'react';
import { useItemStore, useCategoryStore } from '@/store';

const ItemForm = ({ itemId = null, onSuccess }) => {
  const { 
    item,
    loading,
    createItem,
    updateItem,
    fetchItemById,
    clearCurrentItem
  } = useItemStore();

  const { 
    categories, 
    fetchCategories, 
    getActiveCategories 
  } = useCategoryStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'both',
    size: 'One Size',
    condition: 'Good',
    images: [''],
    tags: [''],
    pointsValue: 0,
  });

  useEffect(() => {
    fetchCategories();
    
    if (itemId) {
      fetchItemById(itemId);
    } else {
      clearCurrentItem();
    }
  }, [itemId, fetchCategories, fetchItemById, clearCurrentItem]);

  useEffect(() => {
    if (item && itemId) {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        category: item.category || '',
        type: item.type || 'both',
        size: item.size || 'One Size',
        condition: item.condition || 'Good',
        images: item.images || [''],
        tags: item.tags || [''],
        pointsValue: item.pointsValue || 0,
      });
    }
  }, [item, itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Clean up form data
      const cleanData = {
        ...formData,
        images: formData.images.filter(img => img.trim() !== ''),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        pointsValue: Number(formData.pointsValue)
      };

      if (itemId) {
        await updateItem(itemId, cleanData);
      } else {
        await createItem(cleanData);
      }

      // Reset form if creating new item
      if (!itemId) {
        setFormData({
          title: '',
          description: '',
          category: '',
          type: 'both',
          size: 'One Size',
          condition: 'Good',
          images: [''],
          tags: [''],
          pointsValue: 0,
        });
      }

      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const activeCategories = getActiveCategories();

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {itemId ? 'Update Item' : 'Create New Item'}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">Select a category</option>
          {activeCategories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="swap">Swap Only</option>
          <option value="points">Points Only</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Size</label>
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="XXXL">XXXL</option>
          <option value="One Size">One Size</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Condition</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Points Value</label>
        <input
          type="number"
          name="pointsValue"
          value={formData.pointsValue}
          onChange={handleChange}
          min="0"
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Images</label>
        {formData.images.map((image, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              value={image}
              onChange={(e) => handleArrayChange(index, e.target.value, 'images')}
              placeholder="Image URL"
              className="flex-1 border rounded-md px-3 py-2"
            />
            {formData.images.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'images')}
                className="bg-red-500 text-white px-3 py-2 rounded-md"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('images')}
          className="bg-green-500 text-white px-3 py-2 rounded-md text-sm"
        >
          Add Image
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Tags</label>
        {formData.tags.map((tag, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={tag}
              onChange={(e) => handleArrayChange(index, e.target.value, 'tags')}
              placeholder="Tag"
              className="flex-1 border rounded-md px-3 py-2"
            />
            {formData.tags.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'tags')}
                className="bg-red-500 text-white px-3 py-2 rounded-md"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('tags')}
          className="bg-green-500 text-white px-3 py-2 rounded-md text-sm"
        >
          Add Tag
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Saving...' : (itemId ? 'Update Item' : 'Create Item')}
      </button>
    </form>
  );
};

export default ItemForm;
