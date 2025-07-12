import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Swaps',
      value: '186',
      change: '+8%',
      changeType: 'increase',
      icon: ShoppingBag,
      color: 'green'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-5%',
      changeType: 'decrease',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Revenue (Points)',
      value: '45,231',
      change: '+15%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'purple'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'approval',
      message: 'New item "Vintage Camera" needs approval',
      user: 'Mike Johnson',
      time: '2 minutes ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'swap',
      message: 'Swap completed successfully',
      user: 'Sarah Wilson',
      time: '15 minutes ago',
      priority: 'normal'
    },
    {
      id: 3,
      type: 'report',
      message: 'User reported inappropriate content',
      user: 'Anonymous',
      time: '1 hour ago',
      priority: 'high'
    },
    {
      id: 4,
      type: 'registration',
      message: 'New user registered',
      user: 'Emma Thompson',
      time: '2 hours ago',
      priority: 'low'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      yellow: 'bg-yellow-500 text-white',
      purple: 'bg-purple-500 text-white',
      red: 'bg-red-500 text-white'
    };
    return colors[color] || colors.blue;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 bg-red-100',
      normal: 'text-blue-600 bg-blue-100',
      low: 'text-gray-600 bg-gray-100'
    };
    return colors[priority] || colors.normal;
  };

  const getActivityIcon = (type) => {
    const icons = {
      approval: Clock,
      swap: CheckCircle,
      report: AlertTriangle,
      registration: Users
    };
    return icons[type] || Clock;
  };

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-0">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-500">by {activity.user}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                        {activity.priority}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Manage Users</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Approve Items</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">View Reports</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Analytics</p>
            </button>
          </div>
        </div>
      </div>

      {/* Platform Health */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm font-medium text-gray-900">System Status</p>
            <p className="text-xs text-green-600">All systems operational</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm font-medium text-gray-900">User Growth</p>
            <p className="text-xs text-blue-600">+12% this month</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-sm font-medium text-gray-900">Avg Response Time</p>
            <p className="text-xs text-yellow-600">2.3 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
