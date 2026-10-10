import React, { useState, useEffect } from 'react';
import { Enquiry, UserType } from '../types';
import api from '../services/api';
import { X, Send, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface EnquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
  initialUserType?: UserType;
  onSuccess?: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  userType?: string;
  interest?: string;
  message?: string;
  server?: string;
}

export const EnquiryFormModal: React.FC<EnquiryFormModalProps> = ({
  isOpen,
  onClose,
  initialInterest = '',
  initialUserType = 'Customer',
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Omit<Enquiry, '_id' | 'status' | 'createdAt'>>({
    name: '',
    email: '',
    phone: '',
    userType: initialUserType,
    interest: initialInterest || 'General Drone Query',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (initialInterest) {
      setFormData((prev) => ({ ...prev, interest: initialInterest }));
    }
    if (initialUserType) {
      setFormData((prev) => ({ ...prev, userType: initialUserType }));
    }
  }, [initialInterest, initialUserType, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // 2. Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. user@domain.com).';
    }

    // 3. Phone validation
    const phoneRegex = /^[\d\+\-\s\(\)]{7,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    // 4. User type validation
    if (!['Student', 'Customer', 'Other'].includes(formData.userType)) {
      newErrors.userType = 'Please select a valid User Type.';
    }

    // 5. Interest validation
    if (!formData.interest.trim()) {
      newErrors.interest = 'Please specify your service or course of interest.';
    }

    // 6. Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please include a message describing your query.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await api.submitEnquiry(formData);
      if (response.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          userType: 'Customer',
          interest: 'General Drone Query',
          message: '',
        });
        setErrors({});
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      console.error('[Form Submit Error]:', err);
      const serverMsg =
        err.response?.data?.message || 'Failed to submit enquiry. Please verify your details and backend server state.';
      setErrors((prev) => ({ ...prev, server: serverMsg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-lg overflow-hidden border-orange-500/40 shadow-2xl relative">
        {/* Header */}
        <div className="bg-gray-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold font-heading text-white">Submit Lead Enquiry</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
          {submitSuccess ? (
            <div className="bg-emerald-950/60 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">Enquiry Submitted!</h3>
              <p className="text-emerald-200 text-sm">
                Thank you for reaching out to DroneTV. Our engineering support team will contact you shortly via email or phone.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="btn-primary py-2.5 px-6 text-sm"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.server && (
                <div className="bg-rose-950/60 border border-rose-500/40 p-3.5 rounded-xl text-rose-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errors.server}</span>
                </div>
              )}

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. aarav@example.com"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Phone & User Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                  />
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>

                <div>
                  <label className="form-label">I am a... *</label>
                  <select
                    value={formData.userType}
                    onChange={(e) => setFormData({ ...formData, userType: e.target.value as UserType })}
                    className={`form-select ${errors.userType ? 'error' : ''}`}
                  >
                    <option value="Customer">Customer (Commercial / Services)</option>
                    <option value="Student">Student (Pilot Training / Courses)</option>
                    <option value="Other">Other / General Partner</option>
                  </select>
                  {errors.userType && <p className="error-text">{errors.userType}</p>}
                </div>
              </div>

              {/* Row 3: Interest */}
              <div>
                <label className="form-label">Service or Course of Interest *</label>
                <input
                  type="text"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  placeholder="e.g. Aerial Mapping, DGCA Pilot License, Crop Spraying"
                  className={`form-input ${errors.interest ? 'error' : ''}`}
                />
                {errors.interest && <p className="error-text">{errors.interest}</p>}
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="form-label">Enquiry Message *</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your requirements, project timeline, or questions..."
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                />
                {errors.message && <p className="error-text">{errors.message}</p>}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary py-2.5 px-4 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary py-2.5 px-6 text-xs shadow-orange-500/30 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Enquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
