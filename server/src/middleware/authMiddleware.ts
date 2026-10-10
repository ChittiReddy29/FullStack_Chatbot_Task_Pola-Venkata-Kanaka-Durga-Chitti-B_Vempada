import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to verify Admin Key for protected CRUD operations (GET all, GET by ID, PUT/PATCH, DELETE)
 * Header expected: x-admin-key: <ADMIN_SECRET_KEY>
 */
export const verifyAdminKey = (req: Request, res: Response, next: NextFunction): void => {
  const adminKey = req.headers['x-admin-key'] as string;
  const expectedKey = process.env.ADMIN_SECRET_KEY || 'droneTV_admin_key_2026';

  if (!adminKey) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Admin authentication key missing in request headers (x-admin-key)',
    });
    return;
  }

  if (adminKey !== expectedKey) {
    res.status(403).json({
      success: false,
      message: 'Forbidden: Invalid Admin security key provided',
    });
    return;
  }

  next();
};
