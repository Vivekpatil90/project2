import { Router } from 'express';
import { createReservation, getReservations, updateReservationStatus } from '../controllers/reservationController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();
// Public: create reservation. Admin: list & update status.
router.route('/').get(protect, adminOnly, getReservations).post(createReservation);
router.patch('/:id/status', protect, adminOnly, updateReservationStatus);
export default router;
