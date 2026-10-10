import { ChatMessage } from '../types';
import api from './api';

export const PREDEFINED_QUESTIONS = [
  'What services does DroneTV provide?',
  'What courses / training are available?',
  'How can I contact DroneTV?',
  'How can I register?',
  'I am interested in a service.',
  'I am a student.',
  'I want to speak with someone.',
];

export const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'bot-welcome',
  sender: 'bot',
  text: 'Hello! 👋 Welcome to DroneTV AI Support & Lead Assistant. How can I assist you today with our drone services or DGCA pilot training courses?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedQuestions: [
    'What services does DroneTV provide?',
    'What courses / training are available?',
    'I am interested in a service.',
    'I am a student.',
  ],
};

/**
 * Process user question either via backend API or instant rule match engine
 */
export async function getBotResponse(userMessage: string): Promise<{
  reply: string;
  suggestedQuestions: string[];
  actionTrigger?: 'open_form' | 'open_courses' | 'open_services' | 'contact_direct' | null;
}> {
  try {
    // Attempt backend API response first
    const apiRes = await api.sendChatMessage(userMessage);
    if (apiRes.success && apiRes.data) {
      return apiRes.data;
    }
  } catch (err) {
    console.warn('[Chatbot Rules] Backend API unavailable or offline, using client-side rule engine fallback.');
  }

  // Fallback client-side rule engine
  const lowerMsg = userMessage.toLowerCase().trim();

  if (lowerMsg.includes('service') || lowerMsg.includes('provide') || lowerMsg.includes('offer')) {
    return {
      reply:
        'DroneTV offers 5 core specialized drone services:\n\n1. Aerial Surveillance & Thermal Mapping\n2. Agriculture Crop Mapping & Spraying\n3. Infrastructure & Construction Inspection\n4. Aerial Cinematography & FPV Filming\n5. Drone Repair & Custom Engineering',
      suggestedQuestions: [
        'I am interested in a service.',
        'What courses / training are available?',
        'How can I contact DroneTV?',
      ],
      actionTrigger: 'open_services',
    };
  }

  if (lowerMsg.includes('course') || lowerMsg.includes('training') || lowerMsg.includes('learn') || lowerMsg.includes('pilot')) {
    return {
      reply:
        'Our DGCA-aligned training programs include:\n\n• Micro & Small Category Drone Pilot License\n• Agriculture Spray Drone Operations\n• Aerial Survey & GIS Mapping\n• Drone Maintenance & Hardware Assembly',
      suggestedQuestions: [
        'I am a student.',
        'How can I register?',
        'What services does DroneTV provide?',
      ],
      actionTrigger: 'open_courses',
    };
  }

  if (lowerMsg.includes('contact') || lowerMsg.includes('reach') || lowerMsg.includes('phone') || lowerMsg.includes('email')) {
    return {
      reply:
        'You can contact the DroneTV team directly:\n\n📧 Email: support@dronetv.in\n📞 Phone: +91 88043 49999 / +91 6303230227\n📍 Head Office: IPAGE Tech Hub, India',
      suggestedQuestions: [
        'I want to speak with someone.',
        'How can I register?',
      ],
      actionTrigger: 'contact_direct',
    };
  }

  if (lowerMsg.includes('register') || lowerMsg.includes('enroll') || lowerMsg.includes('join')) {
    return {
      reply:
        'Registration is quick and easy! You can fill out our instant Lead Enquiry Form, select your preferred course or service, and our training coordinator will reach out to complete your admission.',
      suggestedQuestions: [
        'I am a student.',
        'I am interested in a service.',
        'What courses / training are available?',
      ],
      actionTrigger: 'open_form',
    };
  }

  if (lowerMsg.includes('interested in a service') || lowerMsg.includes('interested service')) {
    return {
      reply:
        'Excellent! We provide customized UAV solutions for commercial, industrial, and agricultural needs. Please fill out our short Enquiry Form to receive a customized project quotation.',
      suggestedQuestions: [
        'What services does DroneTV provide?',
        'I want to speak with someone.',
      ],
      actionTrigger: 'open_form',
    };
  }

  if (lowerMsg.includes('i am a student') || lowerMsg.includes('student')) {
    return {
      reply:
        'Welcome! DroneTV offers specialized student packages, hands-on flight simulator sessions, and DGCA drone pilot certification guidance for aspiring aerospace engineers and pilots.',
      suggestedQuestions: [
        'What courses / training are available?',
        'How can I register?',
        'I want to speak with someone.',
      ],
      actionTrigger: 'open_form',
    };
  }

  if (lowerMsg.includes('speak with someone') || lowerMsg.includes('speak someone') || lowerMsg.includes('call me')) {
    return {
      reply:
        'We would be delighted to call you! Please submit your name and phone number using our Enquiry Form, and a DroneTV technical specialist will call you back within 15 minutes.',
      suggestedQuestions: [
        'How can I contact DroneTV?',
        'I am interested in a service.',
      ],
      actionTrigger: 'open_form',
    };
  }

  // Default fallback for unrecognized input
  return {
    reply:
      "I'm sorry, I couldn't match that query. I am trained to assist with DroneTV's drone services, pilot training programs, registration details, and instant contact requests.",
    suggestedQuestions: [
      'What services does DroneTV provide?',
      'What courses / training are available?',
      'How can I contact DroneTV?',
      'How can I register?',
      'I want to speak with someone.',
    ],
    actionTrigger: null,
  };
}
