"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const EnquirySchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
// Indexes for fast searching and filtering in Admin Dashboard
EnquirySchema.index({ email: 1 });
EnquirySchema.index({ userType: 1 });
EnquirySchema.index({ status: 1 });
EnquirySchema.index({ createdAt: -1 });
exports.default = mongoose_1.default.model('Enquiry', EnquirySchema);
