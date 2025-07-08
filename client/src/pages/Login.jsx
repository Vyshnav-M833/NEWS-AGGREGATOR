import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Newspaper, ArrowRight, Sparkles, Sun, Moon, Bell, BellOff } from 'lucide-react';
import api from '../api';
import { toast } from 'react-toastify';
import { setToken } from '../utils/auth';
import { useTheme } from '../contexts/ThemeContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem('notificationsEnabled') === 'true'
  );
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('notificationsEnabled', newState.toString());
    
    if (newState) {
      // Request notification permission if enabling
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            toast.success('Notifications enabled! 🔔');
          } else {
            toast.info('Notifications blocked by browser settings');
            setNotificationsEnabled(false);
            localStorage.setItem('notificationsEnabled', 'false');
          }
        });
      } else if (Notification.permission === 'granted') {
        toast.success('Notifications enabled! 🔔');
      } else {
        toast.info('Please enable notifications in your browser settings');
      }
    } else {
      toast.info('Notifications disabled 🔕');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/login', form);
      setToken(data.token);
      toast.success('Welcome back! 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
      {/* Settings Bar */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-20">
        {/* Notifications Toggle */}
        <button
          onClick={toggleNotifications}
          className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
          title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
        >
          {notificationsEnabled ? 
            <Bell className="w-5 h-5 text-blue-600" /> : 
            <BellOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          }
        </button>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
            <Newspaper className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome to NewsHub
          </h1>
          <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4" />
            Your ultimate news experience awaits
          </p>
        </div>

        {/* Login form */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/20 animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Sign In</h2>
            <p className="text-gray-600 dark:text-gray-300">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}