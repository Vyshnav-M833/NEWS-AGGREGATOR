import React from 'react';
import { 
  Calendar, 
  User, 
  Eye, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Clock,
  Tag,
  Heart,
  MessageCircle
} from 'lucide-react';

export default function ArticleList({ articles, onEdit, onDelete, loading }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No articles found</h3>
        <p className="text-gray-600 dark:text-gray-400">Create your first article to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <article
          key={article._id}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              {/* Category Badge */}
              {article.category && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                  <Tag className="w-3 h-3" />
                  {article.category}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {article.title}
              </h3>

              {/* Content Preview */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {article.content ? article.content.substring(0, 200) + '...' : 'No content available'}
              </p>

              {/* Meta Information */}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author || 'Unknown Author'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.createdAt || article.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
              </div>

              {/* Engagement */}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{article.views || 0} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{article.likes || 0} likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{article.comments || 0} comments</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                  title="Open article"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
              
              {onEdit && (
                <button
                  onClick={() => onEdit(article)}
                  className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200"
                  title="Edit article"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this article?')) {
                      onDelete(article._id);
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                  title="Delete article"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}