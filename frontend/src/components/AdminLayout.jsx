import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import AdminDashboard from '@/components/AdminDashboard';
import { 
  Search, 
  Users, 
  ShoppingBag, 
  List, 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  Settings,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'swaps', label: 'Manage Orders', icon: ShoppingBag },
    { id: 'items', label: 'Manage Listings', icon: List },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Mock data for demonstration
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      joinDate: '2024-01-15',
      status: 'active',
      swaps: 12,
      points: 850
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      joinDate: '2024-02-10',
      status: 'active',
      swaps: 8,
      points: 620
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      joinDate: '2024-01-20',
      status: 'suspended',
      swaps: 3,
      points: 150
    }
  ];

  const renderUserManagement = () => (
    <div className="space-y-4 ">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
        
        {/* Filter and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Users</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Banned</option>
            </select>
            <input
              type="text"
              placeholder="Search users..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Export Users</Button>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {mockUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">Joined: {user.joinDate}</span>
                    <span className="text-xs text-gray-500">Swaps: {user.swaps}</span>
                    <span className="text-xs text-gray-500">Points: {user.points}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  {user.status === 'active' ? 'Suspend' : 'Activate'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return renderUserManagement();
      case 'swaps':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Swap Management</h3>
            <p className="text-gray-600">Swap management interface coming soon...</p>
          </div>
        );
      case 'items':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Management</h3>
            <p className="text-gray-600">Item management interface coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Settings</h3>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content under navbar */}
      <div className="pt-20 flex h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <div
          className={`fixed top-20 left-0 h-[calc(100vh-5rem)] bg-gray-900 text-white transition-all duration-300 flex flex-col overflow-hidden flex-shrink-0 z-20 ${
            sidebarOpen ? 'w-64' : 'w-16'
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <h2 className="text-xl font-bold whitespace-nowrap">Admin Panel</h2>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 justify-start' : 'justify-center'} px-3 py-2 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      title={!sidebarOpen ? item.label : ''}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-700">
            <button 
              className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 justify-start' : 'justify-center'} px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors`}
              title={!sidebarOpen ? 'Logout' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="whitespace-nowrap">Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex flex-col min-h-[calc(100vh-5rem)] w-full min-w-0`}
          style={{
            marginLeft: sidebarOpen ? '16rem' : '4rem',
            transition: 'margin-left 0.3s'
          }}
        >
          <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">
            {/* Admin Header (below navbar) */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {navigationItems.find(item => item.id === activeTab)?.label}
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-auto p-6 min-w-0 w-full">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AdminLayout;
