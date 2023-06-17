import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  signUp,
  login,
  getUsers,
  getUserById,
  updateUserById,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// protect ensures only authenticated users can get users
router.route('/').get(protect, getUsers);
router.route('/login').post(login);
router.route('/register').post(signUp);

router
  .route('/:id')
  .get(protect, getUserById)
  .put(protect, updateUserById)
  .delete(protect, deleteUser);

export default router;
