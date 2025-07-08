import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Newspaper, 
  Home, 
  TrendingUp, 
  User, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  Sun,
  Moon,
  Star,
  Plus
} from 'lucide-react';
import { clearToken } from '../utils/auth';
import { useTheme } from '../contexts/ThemeContext';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem('notificationsEnabled') === 'true'
  );
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('notificationsEnabled', newState.toString());
    
    if (newState && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', active: location.pathname === '/' },
    { icon: Newspaper, label: 'News Headlines', path: '/headlines', active: location.pathname === '/headlines' },
    { icon: Star, label: 'Saved Articles', path: '/saved', active: location.pathname === '/saved' },
    { icon: Plus, label: 'Create Article', path: '/create', active: location.pathname === '/create' },
    { icon: TrendingUp, label: 'Trending', path: '/trending', active: false },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NewsHub
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      item.active
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${item.active ? 'text-white' : ''}`} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          {/* Top navigation */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 mr-4"
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search news..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <button 
                  onClick={toggleNotifications}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 relative"
                  title={notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled'}
                >
                  <Bell className={`w-5 h-5 ${notificationsEnabled ? 'text-blue-600' : ''}`} />
                  {notificationsEnabled && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Welcome back!</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
