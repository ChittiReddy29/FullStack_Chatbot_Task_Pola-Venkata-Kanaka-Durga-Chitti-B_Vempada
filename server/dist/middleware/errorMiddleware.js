"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.notFoundHandler = void 0;
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Resource not found: ${req.originalUrl}`,
    });
};
exports.notFoundHandler = notFoundHandler;
const globalErrorHandler = (err, req, res, next) => {
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
        const errors = Object.values(err.errors).map((el) => ({
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
    const message = process.env.NODE_ENV === 'production' || statusCode === 500
        ? 'An unexpected server error occurred. Please try again later.'
        : err.message || 'Server error';
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.globalErrorHandler = globalErrorHandler;
