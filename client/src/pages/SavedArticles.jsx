import React from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Trash2, 
  Clock, 
  ArrowRight,
  Star,
  Search
} from 'lucide-react';
import { useSavedArticles } from '../contexts/SavedArticlesContext';

export default function SavedArticles() {
  const { savedArticles, removeSavedArticle, clearAllSaved } = useSavedArticles();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (savedArticles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              No Saved Articles Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Start saving articles you want to read later by clicking the bookmark icon
            </p>
            <a
              href="/headlines"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Browse News
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                <Star className="w-10 h-10 text-yellow-500" />
                Saved Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {savedArticles.length} article{savedArticles.length !== 1 ? 's' : ''} saved for later reading
              </p>
            </div>
            {savedArticles.length > 0 && (
              <button
                onClick={clearAllSaved}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article, idx) => (
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
                    onClick={() => removeSavedArticle(article.url)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
                  >
                    <BookmarkCheck className="w-4 h-4 text-blue-600" />
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
                    Saved {formatDate(article.savedAt)}
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
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 group"
                  >
                    Read article
                    <ExternalLink className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                  
                  <button
                    onClick={() => removeSavedArticle(article.url)}
                    className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
