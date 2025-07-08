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
      console.log('Fetching news with params:', { category });
      const { data } = await api.get('/news', {
        params: {
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
  }, [category]);

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
    <div className="min-h-screen bg-gray-900">
      {/* Header Section */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white">
                📰 News Headlines
              </h1>
              <p className="text-gray-400 mt-2">
                Stay updated with the latest news from around the world
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm font-medium">
                <selectedCategoryData.icon className="w-4 h-4 inline mr-2" />
                {selectedCategoryData?.label}
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  category === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Newspaper className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Fetching Latest News
              </h3>
              <p className="text-gray-400">Getting the best stories for you...</p>
            </div>
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search terms or category selection.</p>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <article
                key={idx}
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:bg-gray-750 transition-colors duration-200"
              >
                {/* Article Image */}
                {article.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() => toggleSaveArticle(article)}
                      className="absolute top-3 right-3 p-2 bg-gray-900/80 rounded-lg hover:bg-gray-900 transition-colors duration-200"
                    >
                      {isArticleSaved(article.url) ? (
                        <BookmarkCheck className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                )}

                <div className="p-6">
                  {/* Source and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-400 bg-blue-900/30 px-2 py-1 rounded-lg">
                      {article.source?.name || 'Unknown Source'}
                    </span>
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-white mb-3 line-clamp-2 hover:text-blue-400 transition-colors duration-200">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {article.description || 'No description available for this article.'}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleReadClick(article)}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                    >
                      Read full article
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleSaveArticle(article)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                      >
                        {isArticleSaved(article.url) ? (
                          <BookmarkCheck className="w-4 h-4 text-blue-400" />
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
