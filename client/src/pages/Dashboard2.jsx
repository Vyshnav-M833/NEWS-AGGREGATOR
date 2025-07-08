import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Zap, 
  Globe, 
  Star,
  Calendar,
  Eye,
  BarChart3,
  Activity,
  Newspaper,
  Plus
} from 'lucide-react';
import api from '../api';
import { toast } from 'react-toastify';
import { clearToken } from '../utils/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalArticles: 0,
    readToday: 0,
    savedArticles: 0,
    categories: 0
  });
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch recent news
        const { data } = await api.get('/news', {
          params: { max: 6 }
        });
        setRecentNews(data.articles || []);
        
        // Mock stats for now
        setStats({
          totalArticles: data.totalResults || 1250,
          readToday: 8,
          savedArticles: 24,
          categories: 7
        });
      } catch (err) {
        if (err.response?.status === 401) {
          clearToken();
          navigate('/login');
        } else {
          toast.error('Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const StatCard = ({ icon: Icon, title, value, change, color, bgColor }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-2 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}% from yesterday
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl ${bgColor}`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>
    </div>
  );

  const NewsCard = ({ article, index }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
      <div className="flex items-start space-x-3">
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {article.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs mt-2 font-medium"
          >
            Read more
            <ArrowRight className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's what's happening in your news world today
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/headlines"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Newspaper className="w-5 h-5" />
              Browse News
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={BookOpen}
          title="Total Articles"
          value={stats.totalArticles.toLocaleString()}
          change={12}
          color="text-blue-600"
          bgColor="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard
          icon={Eye}
          title="Read Today"
          value={stats.readToday}
          change={25}
          color="text-green-600"
          bgColor="bg-green-100 dark:bg-green-900/30"
        />
        <StatCard
          icon={Star}
          title="Saved Articles"
          value={stats.savedArticles}
          change={8}
          color="text-purple-600"
          bgColor="bg-purple-100 dark:bg-purple-900/30"
        />
        <StatCard
          icon={Globe}
          title="Categories"
          value={stats.categories}
          color="text-orange-600"
          bgColor="bg-orange-100 dark:bg-orange-900/30"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent News */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Latest Headlines
              </h2>
              <Link
                to="/headlines"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentNews.slice(0, 5).map((article, index) => (
                <NewsCard key={index} article={article} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/headlines"
                className="flex items-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 transition-all duration-200 group"
              >
                <Newspaper className="w-5 h-5 mr-3" />
                <span className="font-medium">Browse Headlines</span>
                <ArrowRight className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <button className="flex items-center w-full p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 transition-all duration-200 group">
                <Star className="w-5 h-5 mr-3" />
                <span className="font-medium">Saved Articles</span>
                <ArrowRight className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button className="flex items-center w-full p-3 rounded-xl bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 transition-all duration-200 group">
                <Plus className="w-5 h-5 mr-3" />
                <span className="font-medium">Create Article</span>
                <ArrowRight className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Reading Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Reading Activity
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Articles read this week</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">28</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                75% of your weekly goal (40 articles)
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Technology: 12 articles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Business: 8 articles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Science: 5 articles</span>
              </div>
            </div>
          </div>

          {/* Today's Date */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">Today</h3>
                <p className="text-blue-100">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
