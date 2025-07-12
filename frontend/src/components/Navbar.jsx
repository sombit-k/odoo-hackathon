import React, { useState } from 'react';
// import Header from './Header'; // Remove unused import
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, Search, LogIn } from 'lucide-react';
import SaveUserButton from '@/components/SaveUserButton'; // Ensure this component is correctly imported

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/landingpage" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ReWear</h1>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/landingpage" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link //delete this later
              to="/admin" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>(delete later) Admin</span>
            </Link>
            <Link //delete this later
              to="/product" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>(delete later) Product</span>
            </Link>


            <SaveUserButton />
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </form>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
