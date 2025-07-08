import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-400">Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-gray-600 dark:text-gray-400">using</span>
            <Code className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600 dark:text-gray-400">and</span>
            <Coffee className="w-4 h-4 text-yellow-600" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
