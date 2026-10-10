import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Enquiry, { UserType, EnquiryStatus } from '../models/Enquiry.js';

/**
 * Escapes regex special characters to prevent ReDoS or unintended pattern matching
 */
function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * @desc    Create a new enquiry / lead submission
 * @route   POST /api/enquiries
 * @access  Public
 */
export const createEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, userType, interest, message } = req.body;

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      userType: userType as UserType,
      interest,
      message,
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our DroneTV team will contact you shortly.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all enquiries with search, filter, and pagination
 * @route   GET /api/enquiries
 * @access  Admin Private (x-admin-key required)
 */
export const getAllEnquiries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { q, userType, status, page = '1', limit = '50' } = req.query;

    const queryFilter: any = {};

    // Filter by userType (Student / Customer / Other)
    if (userType && ['Student', 'Customer', 'Other'].includes(userType as string)) {
      queryFilter.userType = userType;
    }

    // Filter by status (New / Contacted / In Progress / Closed)
    if (status && ['New', 'Contacted', 'In Progress', 'Closed'].includes(status as string)) {
      queryFilter.status = status;
    }

    // Search by text query across name, email, phone, interest, message
    if (q && typeof q === 'string' && q.trim().length > 0) {
      const sanitizedQ = escapeRegex(q.trim());
      const regex = new RegExp(sanitizedQ, 'i');
      queryFilter.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { interest: regex },
        { message: regex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [enquiries, totalCount] = await Promise.all([
      Enquiry.find(queryFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .exec(),
      Enquiry.countDocuments(queryFilter),
    ]);

    const stats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = {
      New: 0,
      Contacted: 0,
      'In Progress': 0,
      Closed: 0,
    };

    stats.forEach((s) => {
      if (s._id in statusCounts) {
        (statusCounts as any)[s._id] = s.count;
      }
    });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total: totalCount,
      page: pageNum,
      totalPages: Math.ceil(totalCount / limitNum),
      statusCounts,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single enquiry by ID
 * @route   GET /api/enquiries/:id
 * @access  Admin Private
 */
export const getEnquiryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: `Invalid enquiry ID format: '${id}'`,
      });
      return;
    }

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      res.status(404).json({
        success: false,
        message: `Enquiry not found with ID: '${id}'`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update enquiry status or admin notes
 * @route   PUT / PATCH /api/enquiries/:id
 * @access  Admin Private
 */
export const updateEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: `Invalid enquiry ID format: '${id}'`,
      });
      return;
    }

    const { status, adminNotes, name, email, phone, userType, interest, message } = req.body;

    const updateFields: any = {};
    if (status) updateFields.status = status;
    if (typeof adminNotes === 'string') updateFields.adminNotes = adminNotes;
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (userType) updateFields.userType = userType;
    if (interest) updateFields.interest = interest;
    if (message) updateFields.message = message;

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      res.status(404).json({
        success: false,
        message: `Enquiry not found with ID: '${id}'`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: updatedEnquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an enquiry
 * @route   DELETE /api/enquiries/:id
 * @access  Admin Private
 */
export const deleteEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: `Invalid enquiry ID format: '${id}'`,
      });
      return;
    }

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      res.status(404).json({
        success: false,
        message: `Enquiry not found with ID: '${id}'`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
