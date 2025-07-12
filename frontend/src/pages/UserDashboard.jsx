import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
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
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: 'January 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    totalSwaps: 24,
    totalListings: 12,
    bio: 'Passionate about sustainable living and finding new homes for pre-loved items. Always looking for vintage electronics and books!'
  };

  // Mock listings data
  const myListings = [
    {
      id: 1,
      title: 'Vintage Leather Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop',
      price: '$85',
      status: 'active',
      views: 156,
      likes: 23,
      datePosted: '2 days ago',
      category: 'Fashion'
    },
    {
      id: 2,
      title: 'Canon EOS Camera',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200&h=200&fit=crop',
      price: '$320',
      status: 'sold',
      views: 89,
      likes: 12,
      datePosted: '1 week ago',
      category: 'Electronics'
    },
    {
      id: 3,
      title: 'Design Books Set',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop',
      price: '$45',
      status: 'pending',
      views: 34,
      likes: 8,
      datePosted: '3 days ago',
      category: 'Books'
    },
    {
      id: 4,
      title: 'Bluetooth Headphones',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop',
      price: '$95',
      status: 'active',
      views: 78,
      likes: 15,
      datePosted: '5 days ago',
      category: 'Electronics'
    }
  ];

  // Mock purchases data
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

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {userProfile.email}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {userProfile.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {userProfile.joinDate}
              </div>
            </div>
            
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold">{userProfile.rating}</span>
                <span className="text-gray-500 ml-1">rating</span>
              </div>
              <div>
                <span className="font-semibold">{userProfile.totalSwaps}</span>
                <span className="text-gray-500 ml-1">swaps</span>
              </div>
              <div>
                <span className="font-semibold">{userProfile.totalListings}</span>
                <span className="text-gray-500 ml-1">listings</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{userProfile.bio}</p>
            
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
          <p className="text-2xl font-bold text-blue-600 mt-1">8</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShoppingBag className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Total Sales</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">$2,450</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Wishlist Items</h3>
          <p className="text-2xl font-bold text-purple-600 mt-1">15</p>
        </div>
      </div>
    </div>
  );

  const renderMyListings = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
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

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {myListings.map((listing) => {
          const StatusIcon = getStatusIcon(listing.status);
          return (
            <div key={listing.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(listing.status)}`}>
                    {listing.status}
                  </span>
                </div>
                <button className="absolute top-2 left-2 p-1 bg-white rounded-full hover:bg-gray-100">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
                <p className="text-lg font-bold text-blue-600 mb-2">{listing.price}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {listing.views} views
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {listing.likes} likes
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{listing.datePosted}</span>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3" />
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
          <p className="text-gray-600">Welcome back, {userProfile.name}! Manage your listings and track your swaps.</p>
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
            My Listings
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
