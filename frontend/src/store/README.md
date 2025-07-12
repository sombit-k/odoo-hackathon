# Zustand Store Documentation

This project uses Zustand for state management, connected to the backend API via axiosInstance.

## Available Stores

### 1. useItemStore
Manages items data and operations.

#### State:
- `items`: Array of all items
- `item`: Currently selected item
- `loading`: Loading state
- `error`: Error messages

#### Actions:
- `fetchItems()`: Get all items
- `fetchItemById(id)`: Get specific item
- `createItem(itemData)`: Create new item
- `updateItem(id, itemData)`: Update existing item
- `deleteItem(id)`: Delete item
- `filterItemsByCategory(categoryId)`: Filter by category
- `filterItemsByType(type)`: Filter by type
- `searchItems(searchTerm)`: Search items
- `getItemsByOwner(ownerId)`: Get items by owner
- `clearCurrentItem()`: Clear current item
- `clearError()`: Clear error
- `reset()`: Reset entire store

#### Usage Example:
```jsx
import { useItemStore } from '@/store';

const MyComponent = () => {
  const { items, loading, fetchItems, createItem } = useItemStore();

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (itemData) => {
    try {
      await createItem(itemData);
      // Success toast will be shown automatically
    } catch (error) {
      // Error toast will be shown automatically
    }
  };

  return (
    <div>
      {loading ? 'Loading...' : items.map(item => (
        <div key={item._id}>{item.title}</div>
      ))}
    </div>
  );
};
```

### 2. useUserStore
Manages user authentication and profile data.

#### State:
- `user`: Current user data
- `loading`: Loading state
- `error`: Error messages

#### Actions:
- `saveUser(token)`: Save user to backend (called on login)
- `getCurrentUser(token)`: Get current user data
- `updateUser(userData, token)`: Update user profile
- `clearUser()`: Clear user data (called on logout)
- `clearError()`: Clear error
- `reset()`: Reset entire store

#### Usage Example:
```jsx
import { useUserStore } from '@/store';
import { useAuth } from '@clerk/clerk-react';

const MyComponent = () => {
  const { user, loading, saveUser } = useUserStore();
  const { getToken } = useAuth();

  const handleSaveUser = async () => {
    const token = await getToken();
    await saveUser(token);
  };

  return (
    <div>
      {user ? `Welcome, ${user.firstName}!` : 'Not logged in'}
    </div>
  );
};
```

### 3. useCategoryStore
Manages categories data and operations.

#### State:
- `categories`: Array of all categories
- `category`: Currently selected category
- `loading`: Loading state
- `error`: Error messages

#### Actions:
- `fetchCategories()`: Get all categories
- `fetchCategoryById(id)`: Get specific category
- `createCategory(categoryData, token)`: Create new category (admin only)
- `updateCategory(id, categoryData, token)`: Update category (admin only)
- `deleteCategory(id, token)`: Delete category (admin only)
- `getActiveCategories()`: Get active categories only
- `getCategoriesByParent(parentId)`: Get subcategories
- `clearCurrentCategory()`: Clear current category
- `clearError()`: Clear error
- `reset()`: Reset entire store

#### Usage Example:
```jsx
import { useCategoryStore } from '@/store';

const MyComponent = () => {
  const { categories, fetchCategories, getActiveCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const activeCategories = getActiveCategories();

  return (
    <select>
      {activeCategories.map(category => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
```

## Backend API Routes

### Items API (`/api/items`)
- `GET /`: Get all approved items
- `GET /:id`: Get item by ID
- `POST /`: Create new item
- `PUT /:id`: Update item
- `DELETE /:id`: Delete item

### User API (`/api`)
- `POST /save-user`: Save user to database (requires auth token)

### Categories API (`/api/categories`)
- `GET /`: Get all categories
- `GET /:id`: Get category by ID
- `POST /`: Create new category (admin only)
- `PUT /:id`: Update category (admin only)
- `DELETE /:id`: Delete category (admin only)

## Features

### Automatic Error Handling
All stores automatically handle errors and show toast notifications using react-hot-toast.

### Optimistic Updates
The stores perform optimistic updates for better UX - they immediately update the local state and only revert if the API call fails.

### State Persistence
Zustand stores maintain their state across component re-renders and route changes.

### Type Safety
All stores include proper TypeScript-like structure and documentation.

## Installation

The required dependencies are already installed:
- `zustand`: State management
- `axios`: HTTP client
- `react-hot-toast`: Toast notifications

## Best Practices

1. **Use selectors**: Only subscribe to the state you need
```jsx
const items = useItemStore(state => state.items);
const loading = useItemStore(state => state.loading);
```

2. **Handle errors gracefully**: The stores automatically show error toasts, but you can also handle them manually
```jsx
try {
  await createItem(data);
} catch (error) {
  // Handle specific error cases
}
```

3. **Clear state when needed**: Use reset functions when navigating away or logging out
```jsx
const { reset } = useItemStore();
useEffect(() => {
  return () => reset(); // Cleanup on unmount
}, []);
```

4. **Use loading states**: Show loading indicators for better UX
```jsx
const { loading } = useItemStore();
if (loading) return <LoadingSpinner />;
```
