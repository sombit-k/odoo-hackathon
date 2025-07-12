import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ArrowRight, 
  Recycle, 
  Shield, 
  Users, 
  Heart,
  Star,
  MapPin,
  Clock,
  Smartphone,
  Laptop,
  Camera,
  Headphones,
  Book,
  ShirtIcon,
  Home,
  Car,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const LandingPage = () => {
  const categories = [
    { id: 1, name: 'Electronics', icon: Smartphone, count: 245, color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Computers', icon: Laptop, count: 189, color: 'bg-green-100 text-green-600' },
    { id: 3, name: 'Photography', icon: Camera, count: 156, color: 'bg-purple-100 text-purple-600' },
    { id: 4, name: 'Audio', icon: Headphones, count: 134, color: 'bg-red-100 text-red-600' },
    { id: 5, name: 'Books', icon: Book, count: 298, color: 'bg-yellow-100 text-yellow-600' },
    { id: 6, name: 'Fashion', icon: ShirtIcon, count: 167, color: 'bg-pink-100 text-pink-600' },
  ];

  const featuredProducts = [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      description: 'Excellent condition, barely used',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
      category: 'Electronics',
      location: 'New York, NY',
      rating: 4.8,
      timeAgo: '2 hours ago',
      user: {
        name: 'Sarah M.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
      }
    },
    {
      id: 2,
      title: 'MacBook Air M2',
      description: 'Perfect for students and professionals',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop',
      category: 'Computers',
      location: 'San Francisco, CA',
      rating: 4.9,
      timeAgo: '1 day ago',
      user: {
        name: 'John D.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      }
    },
    {
      id: 3,
      title: 'Canon EOS R5',
      description: 'Professional camera in mint condition',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=200&fit=crop',
      category: 'Photography',
      location: 'Los Angeles, CA',
      rating: 4.7,
      timeAgo: '3 hours ago',
      user: {
        name: 'Mike R.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      }
    },
    {
      id: 4,
      title: 'Sony WH-1000XM4',
      description: 'Premium noise-canceling headphones',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=200&fit=crop',
      category: 'Audio',
      location: 'Chicago, IL',
      rating: 4.6,
      timeAgo: '5 hours ago',
      user: {
        name: 'Emma L.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      }
    }
  ];

  const clothingItems = [
    {
      id: 1,
      title: 'Vintage Leather Jacket',
      description: 'Classic brown leather jacket in excellent condition',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
      category: 'Fashion',
      size: 'Medium',
      condition: 'Like New'
    },
    {
      id: 2,
      title: 'Designer Silk Dress',
      description: 'Elegant evening dress, perfect for special occasions',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
      category: 'Fashion',
      size: 'Small',
      condition: 'Excellent'
    },
    {
      id: 3,
      title: 'Denim Jacket',
      description: 'Classic blue denim jacket, timeless style',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop',
      category: 'Fashion',
      size: 'Large',
      condition: 'Good'
    },
    {
      id: 4,
      title: 'Cashmere Sweater',
      description: 'Soft and warm cashmere sweater in gray',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop',
      category: 'Fashion',
      size: 'Medium',
      condition: 'Like New'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Swap, Share,
                <span className="block text-blue-200">Sustain</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Join the circular economy. Trade items you don't need for things you love.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
                  Start Swapping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Browse Items
                </Button>
              </div>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto lg:mx-0">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for items to swap..."
                    className="w-full pl-12 pr-20 py-4 rounded-xl text-gray-900 bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-white focus:border-transparent shadow-lg"
                  />
                  <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-blue-200">Active Users</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-blue-200">Items Swapped</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-blue-200">Satisfaction Rate</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-3xl font-bold mb-2">200+</div>
                <div className="text-blue-200">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clothing Carousel Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Clothing Items</h2>
            <p className="text-lg text-gray-600">Discover amazing fashion pieces from our community</p>
          </div>
          
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {clothingItems.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-80 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100 shadow-md">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {item.condition}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Size: {item.size}</span>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Navigation */}
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SwapHub?</h2>
            <p className="text-lg text-gray-600">Join thousands of users who are making sustainable choices</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Reduce waste and give items a second life through sustainable swapping</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Safe</h3>
              <p className="text-gray-600">Verified users, secure transactions, and trusted community guidelines</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">Connect with like-minded people and build lasting relationships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Categories</h2>
            <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} items available</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Items</h2>
              <p className="text-lg text-gray-600">Discover amazing items from our community</p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {product.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {product.timeAgo}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={product.user.avatar}
                        alt={product.user.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-600">{product.user.name}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Swapping?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join our community today and discover a new way to get the things you need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-300 hover:bg-gray-800">
              Download App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SwapHub</h3>
              <p className="text-gray-400">Making sustainable living accessible to everyone through community-driven swapping.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Categories</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Report Item</a></li>
                <li><a href="#" className="hover:text-white">Feedback</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SwapHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;