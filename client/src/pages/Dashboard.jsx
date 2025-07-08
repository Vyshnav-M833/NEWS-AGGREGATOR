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
  Plus,
  Search
} from 'lucide-react';
import api from '../api';
import { toast } from 'react-toastify';
import { clearToken } from '../utils/auth';
import { useSavedArticles } from '../contexts/SavedArticlesContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { savedArticles } = useSavedArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Helper function to get this week's dates
  const getThisWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date.toDateString());
    }
    return dates;
  };

  const [stats, setStats] = useState({
    totalArticles: 0,
    readToday: 0,
    savedArticles: 0,
    categories: 7
  });
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readingActivity, setReadingActivity] = useState({
    weeklyGoal: 35,
    readThisWeek: 0,
    categoryBreakdown: {
      technology: 0,
      business: 0,
      science: 0,
      sports: 0,
      health: 0,
      entertainment: 0
    }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch recent news
        const { data } = await api.get('/news', {
          params: { max: 6 }
        });
        setRecentNews(data.articles || []);
        
        // Get real saved articles count
        const savedCount = savedArticles.length;
        
        // Get reading activity from localStorage
        const readingData = JSON.parse(localStorage.getItem('readingActivity') || '{}');
        const today = new Date().toDateString();
        const thisWeek = getThisWeekDates();
        
        // Calculate articles read today
        const readToday = readingData[today] || 0;
        
        // Calculate articles read this week
        const readThisWeek = thisWeek.reduce((total, date) => {
          return total + (readingData[date] || 0);
        }, 0);
        
        // Get category breakdown from saved articles
        const categoryBreakdown = savedArticles.reduce((acc, article) => {
          // Simple category detection based on keywords in title/description
          const text = `${article.title} ${article.description || ''}`.toLowerCase();
          if (text.includes('tech') || text.includes('software') || text.includes('ai')) acc.technology++;
          else if (text.includes('business') || text.includes('market') || text.includes('economy')) acc.business++;
          else if (text.includes('science') || text.includes('research') || text.includes('study')) acc.science++;
          else if (text.includes('sport') || text.includes('game') || text.includes('player')) acc.sports++;
          else if (text.includes('health') || text.includes('medical') || text.includes('disease')) acc.health++;
          else if (text.includes('movie') || text.includes('music') || text.includes('celebrity')) acc.entertainment++;
          return acc;
        }, { technology: 0, business: 0, science: 0, sports: 0, health: 0, entertainment: 0 });
        
        setStats({
          totalArticles: data.totalResults || 1250,
          readToday,
          savedArticles: savedCount,
          categories: 7
        });
        
        setReadingActivity({
          weeklyGoal: 35,
          readThisWeek,
          categoryBreakdown
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
  }, [navigate, savedArticles]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    try {
      // Search API news
      const { data: apiNews } = await api.get('/news', {
        params: {
          q: searchQuery,
          max: 10
        }
      });

      // Search user-created articles (from localStorage or API)
      const userArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
      const filteredUserArticles = userArticles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Search saved articles
      const filteredSavedArticles = savedArticles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      setSearchResults({
        apiNews: apiNews.articles || [],
        userArticles: filteredUserArticles,
        savedArticles: filteredSavedArticles
      });
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  const StatCard = ({ icon: Icon, title, value, change, color, bgColor }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-750 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-lg bg-gray-700">
          <Icon className="w-6 h-6 text-gray-300" />
        </div>
      </div>
    </div>
  );

  const NewsCard = ({ article, index }) => {
    const handleReadClick = () => {
      // Track article read
      const today = new Date().toDateString();
      const readingData = JSON.parse(localStorage.getItem('readingActivity') || '{}');
      readingData[today] = (readingData[today] || 0) + 1;
      localStorage.setItem('readingActivity', JSON.stringify(readingData));
      
      // Update stats immediately
      setStats(prev => ({
        ...prev,
        readToday: readingData[today]
      }));
    };

    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-750 transition-colors duration-200">
        <div className="flex items-start space-x-3">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white text-sm line-clamp-2 hover:text-blue-400 transition-colors duration-200">
              {article.title}
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleReadClick}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 text-xs mt-2 font-medium"
            >
              Read more
              <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome Back! 👋
            </h1>
            <p className="text-gray-400 mt-2">
              Here's what's happening in your news world today
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/headlines"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Newspaper className="w-5 h-5" />
              Browse News
            </Link>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Search Articles</h2>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news articles, saved articles, and your content..."
                className="w-full pl-12 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
            {searchResults && (
              <button
                onClick={clearSearch}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults && (
        <div className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Search Results for "{searchQuery}"
            </h3>
            
            {/* API News Results */}
            {searchResults.apiNews.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-200 mb-3 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Latest News ({searchResults.apiNews.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.apiNews.slice(0, 4).map((article, idx) => (
                    <div key={idx} className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                      <h5 className="font-medium text-white text-sm line-clamp-2 mb-2">
                        {article.title}
                      </h5>
                      <p className="text-xs text-gray-400 mb-2">
                        {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-xs hover:underline"
                      >
                        Read article
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Articles Results */}
            {searchResults.savedArticles.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-200 mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Saved Articles ({searchResults.savedArticles.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.savedArticles.slice(0, 4).map((article, idx) => (
                    <div key={idx} className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                      <h5 className="font-medium text-white text-sm line-clamp-2 mb-2">
                        {article.title}
                      </h5>
                      <p className="text-xs text-gray-400 mb-2">
                        {article.source?.name} • Saved article
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-xs hover:underline"
                      >
                        Read article
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Articles Results */}
            {searchResults.userArticles.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-200 mb-3 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Your Articles ({searchResults.userArticles.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.userArticles.slice(0, 4).map((article, idx) => (
                    <div key={idx} className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                      <h5 className="font-medium text-white text-sm line-clamp-2 mb-2">
                        {article.title}
                      </h5>
                      <p className="text-xs text-gray-400 mb-2">
                        Created by you • {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-300 line-clamp-2">
                        {article.content.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchResults.apiNews.length === 0 && 
             searchResults.savedArticles.length === 0 && 
             searchResults.userArticles.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={BookOpen}
          title="Total Articles"
          value={stats.totalArticles.toLocaleString()}
          change={12}
        />
        <StatCard
          icon={Eye}
          title="Read Today"
          value={stats.readToday}
          change={25}
        />
        <StatCard
          icon={Star}
          title="Saved Articles"
          value={stats.savedArticles}
          change={8}
        />
        <StatCard
          icon={Globe}
          title="Categories"
          value={stats.categories}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent News */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Latest Headlines
              </h2>
              <Link
                to="/headlines"
                className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentNews.slice(0, 3).map((article, index) => (
                <NewsCard key={index} article={article} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          {/* <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
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
              
              <Link
                to="/saved"
                className="flex items-center w-full p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 transition-all duration-200 group"
              >
                <Star className="w-5 h-5 mr-3" />
                <span className="font-medium">Saved Articles</span>
                <ArrowRight className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link
                to="/create"
                className="flex items-center w-full p-3 rounded-xl bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 transition-all duration-200 group"
              >
                <Plus className="w-5 h-5 mr-3" />
                <span className="font-medium">Create Article</span>
                <ArrowRight className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div> */}          {/* Today's Date */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Today</h3>
                <p className="text-gray-400">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>
          {/* Reading Activity */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Reading Activity
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Articles read this week</span>
                <span className="font-semibold text-white">{readingActivity.readThisWeek}</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((readingActivity.readThisWeek / readingActivity.weeklyGoal) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-gray-400">
                {Math.round((readingActivity.readThisWeek / readingActivity.weeklyGoal) * 100)}% of your weekly goal ({readingActivity.weeklyGoal} articles)
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-400">Technology: {readingActivity.categoryBreakdown.technology} articles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-sm text-gray-400">Business: {readingActivity.categoryBreakdown.business} articles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-400">Science: {readingActivity.categoryBreakdown.science} articles</span>
              </div>
              {readingActivity.categoryBreakdown.sports > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm text-gray-400">Sports: {readingActivity.categoryBreakdown.sports} articles</span>
                </div>
              )}
              {readingActivity.categoryBreakdown.health > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-400">Health: {readingActivity.categoryBreakdown.health} articles</span>
                </div>
              )}
              {readingActivity.categoryBreakdown.entertainment > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-sm text-gray-400">Entertainment: {readingActivity.categoryBreakdown.entertainment} articles</span>
                </div>
              )}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
