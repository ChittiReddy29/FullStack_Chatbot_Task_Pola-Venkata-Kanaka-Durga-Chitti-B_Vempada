import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateEnquiryCreation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\d\+\-\s\(\)]{7,20}$/)
    .withMessage('Please enter a valid phone number (digits, +, -, spaces allowed, 7-20 chars)'),

  body('userType')
    .trim()
    .notEmpty()
    .withMessage('User type is required')
    .isIn(['Student', 'Customer', 'Other'])
    .withMessage('User type must be Student, Customer, or Other'),

  body('interest')
    .trim()
    .notEmpty()
    .withMessage('Service or course of interest is required')
    .isLength({ max: 150 })
    .withMessage('Interest description cannot exceed 150 characters')
    .escape(),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ min: 5, max: 2000 })
    .withMessage('Message must be between 5 and 2000 characters')
    .escape(),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg,
      }));

      res.status(422).json({
        success: false,
        message: 'Validation failed. Please check the submitted fields.',
        errors: formattedErrors,
      });
      return;
    }
    next();
  },
];

export const validateEnquiryStatusUpdate = [
  body('status')
    .optional()
    .trim()
    .isIn(['New', 'Contacted', 'In Progress', 'Closed'])
    .withMessage('Status must be New, Contacted, In Progress, or Closed'),

  body('adminNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Admin notes cannot exceed 1000 characters')
    .escape(),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg,
      }));

      res.status(422).json({
        success: false,
        message: 'Validation failed for update.',
        errors: formattedErrors,
      });
      return;
    }
    next();
  },
];
