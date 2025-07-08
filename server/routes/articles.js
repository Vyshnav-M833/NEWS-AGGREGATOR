import { Router } from 'express';
import auth from '../middleware/auth.js';
import { createArticle, getArticles, updateArticle, deleteArticle } from '../controllers/ArticleController.js';

const router = Router();

router.get('/', auth, getArticles);
router.post('/', auth, createArticle);
router.put('/:id', auth, updateArticle);
router.delete('/:id', auth, deleteArticle);

export default router;