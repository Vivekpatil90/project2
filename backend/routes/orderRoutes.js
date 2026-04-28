import { Router } from 'express';
import { createOrder, getOrders, getOrder } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();
// Public: place an order. Admin: list/view orders.
router.route('/').get(protect, adminOnly, getOrders).post(createOrder);
router.get('/:id', protect, adminOnly, getOrder);
export default router;
