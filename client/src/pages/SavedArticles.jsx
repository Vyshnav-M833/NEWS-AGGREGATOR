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
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              No Saved Articles Yet
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Start saving articles you want to read later by clicking the bookmark icon
            </p>
            <a
              href="/headlines"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
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
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                <Star className="w-10 h-10 text-yellow-400" />
                Saved Articles
              </h1>
              <p className="text-gray-400 mt-2">
                {savedArticles.length} article{savedArticles.length !== 1 ? 's' : ''} saved for later reading
              </p>
            </div>
            {savedArticles.length > 0 && (
              <button
                onClick={clearAllSaved}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
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
                    onClick={() => removeSavedArticle(article.url)}
                    className="absolute top-3 right-3 p-2 bg-gray-900/80 rounded-lg hover:bg-gray-900 transition-colors duration-200"
                  >
                    <BookmarkCheck className="w-4 h-4 text-blue-400" />
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
                    Saved {formatDate(article.savedAt)}
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
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                  >
                    Read article
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                  
                  <button
                    onClick={() => removeSavedArticle(article.url)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
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
