"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enquiryController_js_1 = require("../controllers/enquiryController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const validationMiddleware_js_1 = require("../middleware/validationMiddleware.js");
const router = (0, express_1.Router)();
// Public route to submit lead/enquiry
router.post('/', validationMiddleware_js_1.validateEnquiryCreation, enquiryController_js_1.createEnquiry);
// Protected routes (require x-admin-key header)
router.get('/', authMiddleware_js_1.verifyAdminKey, enquiryController_js_1.getAllEnquiries);
router.get('/:id', authMiddleware_js_1.verifyAdminKey, enquiryController_js_1.getEnquiryById);
router.put('/:id', authMiddleware_js_1.verifyAdminKey, validationMiddleware_js_1.validateEnquiryStatusUpdate, enquiryController_js_1.updateEnquiry);
router.patch('/:id', authMiddleware_js_1.verifyAdminKey, validationMiddleware_js_1.validateEnquiryStatusUpdate, enquiryController_js_1.updateEnquiry);
router.delete('/:id', authMiddleware_js_1.verifyAdminKey, enquiryController_js_1.deleteEnquiry);
exports.default = router;
