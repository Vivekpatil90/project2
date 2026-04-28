import { Router } from 'express';
import { createContact, getContacts } from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = Router();
// Public: submit contact. Admin: list submissions.
router.route('/').get(protect, adminOnly, getContacts).post(createContact);
export default router;
