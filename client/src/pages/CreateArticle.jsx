import React, { useState } from 'react';
import { 
  PlusCircle, 
  Save, 
  Image, 
  Link, 
  Calendar, 
  User,
  Tag,
  FileText,
  Eye,
  CheckCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function CreateArticle() {
  const [article, setArticle] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    category: 'general',
    tags: '',
    imageUrl: '',
    sourceUrl: ''
  });
  
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const categories = [
    'general', 'technology', 'business', 'sports', 
    'health', 'science', 'entertainment'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage for now (in real app, would send to backend)
      const savedArticles = JSON.parse(localStorage.getItem('userArticles') || '[]');
      const newArticle = {
        ...article,
        id: Date.now(),
        publishedAt: new Date().toISOString(),
        source: { name: 'User Created' }
      };
      
      savedArticles.push(newArticle);
      localStorage.setItem('userArticles', JSON.stringify(savedArticles));
      
      toast.success('Article created successfully!');
      
      // Reset form
      setArticle({
        title: '',
        description: '',
        content: '',
        author: '',
        category: 'general',
        tags: '',
        imageUrl: '',
        sourceUrl: ''
      });
      setPreview(false);
    } catch (error) {
      toast.error('Failed to create article');
    } finally {
      setSaving(false);
    }
  };

  if (preview) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Preview Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Article Preview</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setPreview(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Publish Article
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <article className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            {article.imageUrl && (
              <div className="h-64 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              {/* Category and Date */}
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-lg text-sm font-medium capitalize">
                  {article.category}
                </span>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-white mb-4">
                {article.title}
              </h1>

              {/* Author */}
              {article.author && (
                <div className="flex items-center text-gray-400 mb-6">
                  <User className="w-4 h-4 mr-2" />
                  By {article.author}
                </div>
              )}

              {/* Description */}
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {article.description}
              </p>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                {article.content.split('\n').map((paragraph, idx) => (
                  paragraph.trim() && (
                    <p key={idx} className="mb-4 text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>

              {/* Tags */}
              {article.tags && (
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-gray-400" />
                    {article.tags.split(',').map((tag, idx) => (
                      <span key={idx} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-lg text-sm">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <PlusCircle className="w-10 h-10 text-green-400" />
            Create New Article
          </h1>
          <p className="text-gray-400 mt-2">
            Share your thoughts and stories with the world
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg border border-gray-700 p-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                name="title"
                value={article.title}
                onChange={handleInputChange}
                placeholder="Enter a compelling title for your article"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={article.description}
                onChange={handleInputChange}
                placeholder="Write a brief description or summary of your article"
                rows={3}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Article Content *
              </label>
              <textarea
                name="content"
                value={article.content}
                onChange={handleInputChange}
                placeholder="Write your full article content here..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                required
              />
            </div>

            {/* Row for Author and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={article.author}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={article.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="capitalize bg-gray-700">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={article.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={article.tags}
                onChange={handleInputChange}
                placeholder="technology, innovation, future (comma separated)"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={() => setPreview(true)}
              disabled={!article.title || !article.description || !article.content}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview Article
            </button>
            
            <button
              type="submit"
              disabled={!article.title || !article.description || !article.content || saving}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Article
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
