import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorMiddleware.js';
import Enquiry from './models/Enquiry.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// 1. Security Headers via Helmet
app.use(helmet());

// 2. CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, postman) or matching allowed origins
      if (!origin || origin === CORS_ORIGIN || origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev mode
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  })
);

// 3. Rate limiting (max 150 requests per 15 mins per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});
app.use('/api', limiter);

// 4. Request Body Parsers (Limited to 10kb to prevent payload abuse)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    system: 'DroneTV AI Support & Lead Assistant API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// 6. API Route Handlers
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/chatbot', chatbotRoutes);

// 7. 404 Route Handler & Global Error Middleware
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start server after DB connection
const startServer = async () => {
  await connectDB();

  // Seed sample data automatically if DB is empty
  try {
    const count = await Enquiry.countDocuments();
    if (count === 0) {
      console.log('[Server] Database is empty. Seeding initial lead entries...');
      await Enquiry.insertMany([
        {
          name: 'Aarav Sharma',
          email: 'aarav.sharma@example.com',
          phone: '+91 98765 43210',
          userType: 'Student',
          interest: 'DGCA Certified Drone Pilot Training',
          message: 'I am a final year student interested in enrolling in the certified pilot training course.',
          status: 'New',
          adminNotes: 'Inquiry received from website.',
        },
        {
          name: 'Priya Patel',
          email: 'priya.patel@agritech.com',
          phone: '+91 98123 45678',
          userType: 'Customer',
          interest: 'Agriculture Crop Health & Precision Spraying',
          message: 'We manage cotton fields and require thermal crop health mapping and drone spraying.',
          status: 'In Progress',
          adminNotes: 'Quotation sent via email.',
        },
      ]);
    }
  } catch (err) {
    console.warn('[Server] Auto-seed check notice:', err);
  }

  app.listen(PORT, () => {
    console.log(`🚀 [Server] DroneTV API Server running on port ${PORT}`);
    console.log(`🌐 [Server] Health Check available at http://localhost:${PORT}/api/health`);
  });
};

startServer();
