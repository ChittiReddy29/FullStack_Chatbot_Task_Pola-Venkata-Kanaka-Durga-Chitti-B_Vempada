import { Router } from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { verifyAdminKey } from '../middleware/authMiddleware.js';
import {
  validateEnquiryCreation,
  validateEnquiryStatusUpdate,
} from '../middleware/validationMiddleware.js';

const router = Router();

// Public route to submit lead/enquiry
router.post('/', validateEnquiryCreation, createEnquiry);

// Protected routes (require x-admin-key header)
router.get('/', verifyAdminKey, getAllEnquiries);
router.get('/:id', verifyAdminKey, getEnquiryById);
router.put('/:id', verifyAdminKey, validateEnquiryStatusUpdate, updateEnquiry);
router.patch('/:id', verifyAdminKey, validateEnquiryStatusUpdate, updateEnquiry);
router.delete('/:id', verifyAdminKey, deleteEnquiry);

export default router;
