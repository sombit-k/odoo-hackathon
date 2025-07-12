import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import useAuthStore from '@/store/useAuthStore';
import useItemStore from '@/store/useItemStore';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Star, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Filter,
  Search,
  MoreVertical,
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Camera,
  Settings,
  Heart,
  Share,
  MessageCircle
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Zustand stores
  const { user, isAuthenticated, loading: authLoading } = useAuthStore();
  const { items, loading: itemsLoading, fetchUserItems, deleteItem } = useItemStore();

  // Get user's listings - add safety check
  const myListings = user && items ? items.filter(item => item.owner === user._id) : [];
  
  // Mock purchases data (since we don't have a purchase store yet)
  const myPurchases = [
    {
      id: 1,
      title: 'MacBook Pro 2019',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=200&fit=crop',
      price: '$850',
      status: 'completed',
      seller: 'Sarah M.',
      purchaseDate: '1 week ago',
      category: 'Electronics'
    },
    {
      id: 2,
      title: 'Designer Silk Dress',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop',
      price: '$120',
      status: 'in_transit',
      seller: 'Emma L.',
      purchaseDate: '3 days ago',
      category: 'Fashion'
    },
    {
      id: 3,
      title: 'Coffee Table',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
      price: '$180',
      status: 'pending',
      seller: 'Mike R.',
      purchaseDate: '2 days ago',
      category: 'Furniture'
    },
    {
      id: 4,
      title: 'Yoga Mat Set',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop',
      price: '$35',
      status: 'completed',
      seller: 'Lisa K.',
      purchaseDate: '2 weeks ago',
      category: 'Sports'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      sold: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      in_transit: 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: CheckCircle,
      sold: Package,
      pending: Clock,
      completed: CheckCircle,
      in_transit: ShoppingBag
    };
    return icons[status] || Clock;
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's a relative path, prepend the backend URL
    return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/${imagePath}`;
  };

  // Fetch items on component mount
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserItems();
    }
  }, [isAuthenticated, user, fetchUserItems]);

  // Handle authentication redirect
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    } 
  }, [isAuthenticated, authLoading, navigate]);

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  } 
  // Don't render if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name || 'User'}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{user?.name || 'User'}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {user?.email || 'email@example.com'}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {user?.location || 'Location not set'}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
              </div>
            </div>
            
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold">{user?.rating || 0}</span>
                <span className="text-gray-500 ml-1">rating</span>
              </div>
              <div>
                <span className="font-semibold">{user?.totalSwaps || 0}</span>
                <span className="text-gray-500 ml-1">swaps</span>
              </div>
              <div>
                <span className="font-semibold">{myListings.length}</span>
                <span className="text-gray-500 ml-1">listings</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{user?.bio || 'No bio available'}</p>
            
            <div className="flex space-x-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Active Listings</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">{myListings.filter(item => item.status === 'active' || !item.status).length}</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShoppingBag className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Total Sales</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">${myListings.filter(item => item.status === 'sold').reduce((sum, item) => sum + (item.pointsValue || 0), 0)}</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Wishlist Items</h3>
          <p className="text-2xl font-bold text-purple-600 mt-1">{user?.wishlist?.length || 0}</p>
        </div>
      </div>
    </div>
  );

  const handleAddNewListing = () => {
    navigate('/item');
  };

  const handleDeleteListing = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        console.error('Failed to delete listing:', error);
      }
    }
  };

  const renderMyListings = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddNewListing}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Listing
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your listings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Status</option>
            <option>Active</option>
            <option>Sold</option>
            <option>Pending</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Books</option>
            <option>Furniture</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {itemsLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your listings...</p>
        </div>
      )}

      {/* Empty State */}
      {!itemsLoading && myListings.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-600 mb-4">Create your first listing to start swapping!</p>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddNewListing}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Listing
          </Button>
        </div>
      )}

      {/* Listings Grid */}
      {!itemsLoading && myListings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {myListings.map((listing) => {
            const StatusIcon = getStatusIcon(listing.status || 'active');
            return (
              <div key={listing._id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={getImageUrl(listing.images?.[0])}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(listing.status || 'active')}`}>
                      {listing.status || 'active'}
                    </span>
                  </div>
                  <button className="absolute top-2 left-2 p-1 bg-white rounded-full hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
                  <p className="text-lg font-bold text-blue-600 mb-2">{listing.pointsValue || 0} pts</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {listing.views || 0} views
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {listing.likes || 0} likes
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteListing(listing._id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderMyPurchases = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Purchases</h2>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Purchases List */}
      <div className="space-y-4">
        {myPurchases.map((purchase) => {
          const StatusIcon = getStatusIcon(purchase.status);
          return (
            <div key={purchase.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={purchase.image}
                  alt={purchase.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{purchase.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Sold by {purchase.seller} • {purchase.purchaseDate}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-blue-600">{purchase.price}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(purchase.status)}`}>
                      {purchase.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'listings':
        return renderMyListings();
      case 'purchases':
        return renderMyPurchases();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'User'}! Manage your listings and track your swaps.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'listings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            My Listings ({myListings.length})
          </button>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'purchases'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            My Purchases
          </button>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;
