// server/routes/news.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

// GNews API key from .env file
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

router.get('/', async (req, res) => {
  const { q, category, lang = 'en', max = 10 } = req.query;

  console.log('📰 News API called with params:', { q, category, lang, max });

  try {
    // Prepare the API parameters
    const apiParams = {
      lang,
      max,
      token: GNEWS_API_KEY,
    };

    // If we have a specific query, use it, otherwise use category
    if (q && q.trim()) {
      apiParams.q = q;
    } else if (category && category !== 'general') {
      // For specific categories, use relevant keywords
      const categoryKeywords = {
        technology: 'technology OR tech OR software OR AI OR innovation',
        business: 'business OR economy OR finance OR market OR stock',
        sports: 'sports OR football OR basketball OR soccer OR tennis',
        health: 'health OR medical OR disease OR medicine OR wellness',
        science: 'science OR research OR discovery OR study OR experiment',
        entertainment: 'entertainment OR movie OR music OR celebrity OR film'
      };
      apiParams.q = categoryKeywords[category] || category;
    } else {
      // Default to general news
      apiParams.q = 'news OR headlines OR breaking news';
    }

    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: apiParams,
    });

    console.log('✅ GNews API responded with', response.data.articles?.length || 0, 'articles');

    res.json({
      status: 'ok',
      articles: response.data.articles,
      totalResults: response.data.totalArticles || response.data.totalResults,
    });
  } catch (error) {
    console.error('🛑 Error fetching news:', error.message);
    console.error('🛑 Error response:', error.response?.data);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;
