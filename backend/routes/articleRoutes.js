import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  getArticles,
  getArticleById,
  addArticle,
  updateArticleById,
  deleteArticleById,
  getArticlesByUser,
} from '../controllers/articleControllers.js';

const router = express.Router();

router.route('/').get(getArticles).post(protect, addArticle);

router.route('/user/').get(getArticlesByUser);

router
  .route('/:id')
  .get(getArticleById)
  .put(protect, updateArticleById)
  .delete(protect, deleteArticleById);

export default router;
