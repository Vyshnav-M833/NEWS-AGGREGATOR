import React from 'react';
import { Newspaper, Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      <Loader2 className={`${sizes[size]} animate-spin text-blue-600`} />
      {text && <span className="text-gray-600 dark:text-gray-400">{text}</span>}
    </div>
  );
};

const FullPageLoader = ({ message = 'Loading your news experience...' }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-bounce-gentle">
            <Newspaper className="w-10 h-10 text-white" />
          </div>
          
          {/* Spinning border */}
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-2xl animate-spin"></div>
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          NewsHub
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

const NewsSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export { LoadingSpinner, FullPageLoader, CardSkeleton, NewsSkeleton };
