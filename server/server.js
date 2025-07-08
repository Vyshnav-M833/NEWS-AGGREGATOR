import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import articleRoutes from './routes/articles.js';
import newsRoutes from './routes/news.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); 

    console.log('🗄️  MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
})();
