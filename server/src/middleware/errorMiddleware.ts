import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.originalUrl}`,
  });
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('[Unhandled Error]:', err);

  // CastError for invalid MongoDB ObjectIDs
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Invalid resource ID format',
    });
    return;
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el: any) => ({
      field: el.path,
      message: el.message,
    }));
    res.status(422).json({
      success: false,
      message: 'Database schema validation failed',
      errors,
    });
    return;
  }

  // Generic secure error response
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' || statusCode === 500
      ? 'An unexpected server error occurred. Please try again later.'
      : err.message || 'Server error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};
