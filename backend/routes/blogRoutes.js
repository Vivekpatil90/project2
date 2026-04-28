import { Router } from 'express';
import { getPosts, getPostBySlug, createPost } from '../controllers/blogController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();
// Public: read posts. Admin: create.
router.route('/').get(getPosts).post(protect, adminOnly, createPost);
router.get('/:slug', getPostBySlug);
export default router;
