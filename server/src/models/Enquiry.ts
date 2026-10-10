import mongoose, { Schema, Document } from 'mongoose';

export type UserType = 'Student' | 'Customer' | 'Other';
export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      minlength: [7, 'Phone number must be at least 7 characters'],
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    userType: {
      type: String,
      enum: {
        values: ['Student', 'Customer', 'Other'],
        message: 'userType must be either Student, Customer, or Other',
      },
      required: [true, 'User type is required'],
      default: 'Customer',
    },
    interest: {
      type: String,
      required: [true, 'Service or course of interest is required'],
      trim: true,
      maxlength: [150, 'Interest description cannot exceed 150 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'In Progress', 'Closed'],
        message: 'Status must be New, Contacted, In Progress, or Closed',
      },
      default: 'New',
    },
    adminNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast searching and filtering in Admin Dashboard
EnquirySchema.index({ email: 1 });
EnquirySchema.index({ userType: 1 });
EnquirySchema.index({ status: 1 });
EnquirySchema.index({ createdAt: -1 });

export default mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
