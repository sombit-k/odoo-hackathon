import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Star, 
  User, 
  MessageCircle, 
  Shield, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Flag
} from 'lucide-react';

const ProductDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data
  const product = {
    id: 1,
    title: 'Vintage Leather Jacket',
    description: 'This classic brown leather jacket is in excellent condition and perfect for anyone who loves vintage fashion. Made from genuine leather with a timeless design that never goes out of style. The jacket features multiple pockets, a comfortable lining, and shows minimal signs of wear. Perfect for casual outings or adding a retro touch to your wardrobe. Size Medium fits true to size.',
    price: '$120',
    category: 'Fashion',
    condition: 'Like New',
    size: 'Medium',
    brand: 'Vintage Collection',
    location: 'New York, NY',
    datePosted: '2 days ago',
    views: 156,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop'
    ],
    seller: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      rating: 4.8,
      totalSwaps: 23,
      joinDate: 'January 2024',
      responseTime: '2 hours',
      isVerified: true
    }
  };

  // Mock previous listings
  const previousListings = [
    {
      id: 1,
      title: 'Designer Silk Dress',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop',
      price: '$85',
      status: 'sold'
    },
    {
      id: 2,
      title: 'Wool Winter Coat',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=200&h=200&fit=crop',
      price: '$150',
      status: 'sold'
    },
    {
      id: 3,
      title: 'Casual Denim Jacket',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=200&h=200&fit=crop',
      price: '$65',
      status: 'available'
    },
    {
      id: 4,
      title: 'Vintage Handbag',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop',
      price: '$45',
      status: 'available'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="w-4 h-4 mr-2" />
              Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-2 py-1 bg-black bg-opacity-50 text-white text-sm rounded">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {product.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {product.datePosted}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {product.views} views
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{product.price}</div>
                  <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isAvailable ? 'Available' : 'Not Available'}
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-600">Category:</span>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Condition:</span>
                  <p className="font-medium">{product.condition}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Size:</span>
                  <p className="font-medium">{product.size}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Brand:</span>
                  <p className="font-medium">{product.brand}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
                <Button variant="outline" className="flex-1">
                  Make Offer
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{product.seller.name}</h4>
                    {product.seller.isVerified && (
                      <Shield className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {product.seller.rating}
                    </span>
                    <span>{product.seller.totalSwaps} swaps</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Member since:</span>
                  <p className="font-medium">{product.seller.joinDate}</p>
                </div>
                <div>
                  <span className="text-gray-600">Response time:</span>
                  <p className="font-medium">{product.seller.responseTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Previous Listings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Listings from {product.seller.name}</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previousListings.map((listing) => (
              <div key={listing.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-medium text-sm text-gray-900 mb-1 truncate">{listing.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">{listing.price}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      listing.status === 'sold' 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
