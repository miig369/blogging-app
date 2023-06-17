import express from 'express';
import protect from '../middleware/authMiddleware';
import {
  getArticles,
  getArticleById,
  addArticle,
  updateArticleById,
  deleteArticleById,
} from '../controllers/articleControllers.js';

const router = express.Router();

router.route('/').get(getArticles);

router
  .route('/:id')
  .get(getArticleById)
  .post(protect, addArticle)
  .put(protect, updateArticleById)
  .delete(protect, deleteArticleById);

export default router;
