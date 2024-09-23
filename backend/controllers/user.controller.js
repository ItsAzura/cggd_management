import express from 'express';
import {
  getAllUsers,
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUserById,
  deleteUser,
} from '../services/user.service.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router
  .route('/')
  .get(getAllUsers, authenticate, authorizeAdmin)
  .post(createUser);

router.post('/login', loginUser);
router.post('/logout', logoutUser);

router
  .route('/profile/:id')
  .get(getUserProfile, authenticate)
  .put(updateUserProfile, authenticate);

router
  .route('/:id')
  .get(getUserById, authenticate, authorizeAdmin)
  .put(updateUserById, authenticate, authorizeAdmin)
  .delete(deleteUser, authenticate, authorizeAdmin);

export default router;
