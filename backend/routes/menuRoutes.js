import { Router } from 'express';
import { getMenu, getMenuByCategory, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();
// Public reads, admin writes.
router.route('/').get(getMenu).post(protect, adminOnly, createMenuItem);
router.get('/category/:category', getMenuByCategory);
router.route('/:id').put(protect, adminOnly, updateMenuItem).delete(protect, adminOnly, deleteMenuItem);
export default router;
