import React, { useState } from 'react';
import api from '../services/api';
import { UserType } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'Customer' as UserType,
    interest: 'General Contact Enquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || !/^[\d\+\-\s\(\)]{7,20}$/.test(formData.phone)) errs.phone = 'Valid phone is required';
    if (!formData.message.trim() || formData.message.trim().length < 5) errs.message = 'Message must be at least 5 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);
    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          userType: 'Customer',
          interest: 'General Contact Enquiry',
          message: '',
        });
        setErrors({});
      }
    } catch (err: any) {
      setErrors({ server: err.response?.data?.message || 'Submission failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
          <Phone className="w-3.5 h-3.5" /> Direct Support & Lead Desk
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">Contact DroneTV Engineering</h1>
        <p className="text-gray-300 text-sm max-w-xl mx-auto">
          Have project questions or looking for drone pilot admission? Fill out the form or reach out directly to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact info side */}
        <div className="md:col-span-5 space-y-6">
          <div className="glass-panel p-6 space-y-6 border-orange-500/30">
            <h3 className="text-xl font-bold font-heading text-white">Headquarters & Desk</h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Email Address</div>
                  <div className="text-white font-medium">contact@dronetv.example.com</div>
                  <div className="text-gray-400 text-xs">support@dronetv.example.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Phone Support Hotline</div>
                  <div className="text-white font-mono font-medium">+91 98765 43210</div>
                  <div className="text-white font-mono font-medium">+91 91234 56789</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Main Office & Flight Lab</div>
                  <div className="text-white font-medium">DroneTV Technology Hub</div>
                  <div className="text-gray-400 text-xs">Aerospace Park, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="md:col-span-7">
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-white/10">
            <h3 className="text-xl font-bold font-heading text-white">Send Lead Enquiry</h3>

            {submitSuccess ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold font-heading text-white">Enquiry Received!</h4>
                <p className="text-emerald-200 text-xs">
                  We have logged your request in our database. Our team will reach out within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="btn-primary py-2 px-5 text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.server && (
                  <div className="bg-rose-950/60 border border-rose-500/40 p-3 rounded-xl text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errors.server}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="e.g. Vikram Singh"
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="e.g. vikram@example.com"
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="form-label">User Type *</label>
                    <select
                      value={formData.userType}
                      onChange={(e) => setFormData({ ...formData, userType: e.target.value as UserType })}
                      className="form-select"
                    >
                      <option value="Customer">Customer (Commercial)</option>
                      <option value="Student">Student (Pilot Academy)</option>
                      <option value="Other">Other Partner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">Service / Course of Interest *</label>
                  <input
                    type="text"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Crop Spraying, DGCA Pilot License"
                  />
                </div>

                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Describe your inquiry or requirement..."
                  />
                  {errors.message && <p className="error-text">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Enquiry Form
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
