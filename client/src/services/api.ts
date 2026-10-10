import axios from 'axios';
import { Enquiry, UserType, EnquiryStatus } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const api = {
  // 1. Submit lead / enquiry form (Public)
  submitEnquiry: async (enquiryData: Omit<Enquiry, '_id' | 'status' | 'createdAt'>) => {
    const response = await apiClient.post('/enquiries', enquiryData);
    return response.data;
  },

  // 2. Fetch enquiries list with search, userType filter, status filter, and pagination (Admin only)
  fetchEnquiries: async (
    adminKey: string,
    params?: {
      q?: string;
      userType?: UserType | '';
      status?: EnquiryStatus | '';
      page?: number;
      limit?: number;
    }
  ) => {
    const response = await apiClient.get('/enquiries', {
      headers: {
        'x-admin-key': adminKey,
      },
      params,
    });
    return response.data;
  },

  // 3. Fetch single enquiry details (Admin only)
  fetchEnquiryById: async (adminKey: string, id: string) => {
    const response = await apiClient.get(`/enquiries/${id}`, {
      headers: {
        'x-admin-key': adminKey,
      },
    });
    return response.data;
  },

  // 4. Update enquiry status / admin notes (Admin only)
  updateEnquiryStatus: async (
    adminKey: string,
    id: string,
    updateData: { status?: EnquiryStatus; adminNotes?: string }
  ) => {
    const response = await apiClient.put(`/enquiries/${id}`, updateData, {
      headers: {
        'x-admin-key': adminKey,
      },
    });
    return response.data;
  },

  // 5. Delete an enquiry (Admin only)
  deleteEnquiry: async (adminKey: string, id: string) => {
    const response = await apiClient.delete(`/enquiries/${id}`, {
      headers: {
        'x-admin-key': adminKey,
      },
    });
    return response.data;
  },

  // 6. Send chatbot question to backend API
  sendChatMessage: async (message: string) => {
    const response = await apiClient.post('/chatbot/message', { message });
    return response.data;
  },

  // 7. Health check
  checkHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default api;
