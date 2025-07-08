import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Eye,
  TrendingUp,
  Globe,
  Zap,
  Calendar,
  ArrowRight,
  Newspaper
} from 'lucide-react';
import api from '../api.js';
import { useSavedArticles } from '../contexts/SavedArticlesContext';

export default function NewsHeadlines() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const { saveArticle, removeSavedArticle, isArticleSaved } = useSavedArticles();

  const categories = [
    { value: 'general', label: 'General', icon: Globe, color: 'bg-blue-500' },
    { value: 'technology', label: 'Technology', icon: Zap, color: 'bg-purple-500' },
    { value: 'business', label: 'Business', icon: TrendingUp, color: 'bg-green-500' },
    { value: 'sports', label: 'Sports', icon: TrendingUp, color: 'bg-orange-500' },
    { value: 'health', label: 'Health', icon: Globe, color: 'bg-red-500' },
    { value: 'science', label: 'Science', icon: Zap, color: 'bg-indigo-500' },
    { value: 'entertainment', label: 'Entertainment', icon: Globe, color: 'bg-pink-500' },
  ];

  const fetchHeadlines = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Fetching news with params:', { q: query || undefined, category });
      const { data } = await api.get('/news', {
        params: {
          q: query || undefined,
          category,
          max: 20,
        },
      });
      console.log('News data received:', data);
      setArticles(data.articles || []);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      console.error('Error response:', err.response?.data);
      setArticles([]);
    }
    setLoading(false);
  }, [query, category]);

  useEffect(() => {
    fetchHeadlines();
  }, [fetchHeadlines]);

  const toggleSaveArticle = (article) => {
    if (isArticleSaved(article.url)) {
      removeSavedArticle(article.url);
    } else {
      saveArticle(article);
    }
  };

  const handleReadClick = (article) => {
    // Track article read
    const today = new Date().toDateString();
    const readingData = JSON.parse(localStorage.getItem('readingActivity') || '{}');
    readingData[today] = (readingData[today] || 0) + 1;
    localStorage.setItem('readingActivity', JSON.stringify(readingData));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const selectedCategoryData = categories.find(cat => cat.value === category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📰 News Headlines
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Stay updated with the latest news from around the world
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-full text-white text-sm font-medium ${selectedCategoryData?.color}`}>
                <selectedCategoryData.icon className="w-4 h-4 inline mr-2" />
                {selectedCategoryData?.label}
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                placeholder="Search for news, topics, or keywords..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm appearance-none min-w-[150px]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={fetchHeadlines}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Search
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  category === cat.value
                    ? `${cat.color} text-white shadow-lg`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <cat.icon className="w-4 h-4 inline mr-2" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-bounce-gentle">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-2xl animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Fetching Latest News
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Getting the best stories for you...</p>
            </div>
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms or category selection.</p>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <article
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 transform hover:scale-105 group"
              >
                {/* Article Image */}
                {article.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <button
                      onClick={() => toggleSaveArticle(article)}
                      className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
                    >
                      {isArticleSaved(article.url) ? (
                        <BookmarkCheck className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                )}

                <div className="p-6">
                  {/* Source and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                      {article.source?.name || 'Unknown Source'}
                    </span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {article.description || 'No description available for this article.'}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleReadClick(article)}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 group"
                    >
                      Read full article
                      <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleSaveArticle(article)}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {isArticleSaved(article.url) ? (
                          <BookmarkCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
