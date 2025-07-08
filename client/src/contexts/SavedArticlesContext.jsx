import React, { createContext, useContext, useEffect, useState } from 'react';

const SavedArticlesContext = createContext();

export const useSavedArticles = () => {
  const context = useContext(SavedArticlesContext);
  if (!context) {
    throw new Error('useSavedArticles must be used within a SavedArticlesProvider');
  }
  return context;
};

export const SavedArticlesProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedArticles');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  const saveArticle = (article) => {
    setSavedArticles(prev => {
      const exists = prev.find(a => a.url === article.url);
      if (exists) return prev;
      return [...prev, { ...article, savedAt: new Date().toISOString() }];
    });
  };

  const removeSavedArticle = (articleUrl) => {
    setSavedArticles(prev => prev.filter(a => a.url !== articleUrl));
  };

  const isArticleSaved = (articleUrl) => {
    return savedArticles.some(a => a.url === articleUrl);
  };

  const clearAllSaved = () => {
    setSavedArticles([]);
  };

  return (
    <SavedArticlesContext.Provider value={{
      savedArticles,
      saveArticle,
      removeSavedArticle,
      isArticleSaved,
      clearAllSaved
    }}>
      {children}
    </SavedArticlesContext.Provider>
  );
};
