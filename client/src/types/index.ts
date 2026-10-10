export type UserType = 'Student' | 'Customer' | 'Other';
export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';

export interface Enquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status?: EnquiryStatus;
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  actionTrigger?: 'open_form' | 'open_courses' | 'open_services' | 'contact_direct' | null;
}

export interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: string;
  features: string[];
  useCases: string[];
}

export interface CourseItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  certification: string;
  level: string;
  description: string;
  highlights: string[];
  syllabus: string[];
}

export interface EnquiryStats {
  New: number;
  Contacted: number;
  'In Progress': number;
  Closed: number;
}
