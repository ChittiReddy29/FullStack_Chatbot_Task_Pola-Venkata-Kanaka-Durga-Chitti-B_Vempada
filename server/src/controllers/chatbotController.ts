import { Request, Response, NextFunction } from 'express';

interface ChatRule {
  keywords: string[];
  response: string;
  suggestedQuestions?: string[];
  actionTrigger?: 'open_form' | 'open_courses' | 'open_services' | 'contact_direct';
}

const RULES: ChatRule[] = [
  {
    keywords: ['services', 'service', 'provide', 'dronetv provide', 'offer'],
    response:
      'DroneTV provides cutting-edge drone services including Aerial Surveillance & Mapping, Agriculture Crop Monitoring & Spraying, Infrastructure & Thermal Inspection, Aerial Cinematography, and Custom Drone Engineering & Maintenance.',
    suggestedQuestions: [
      'What courses / training are available?',
      'I am interested in a service.',
      'How can I contact DroneTV?',
    ],
    actionTrigger: 'open_services',
  },
  {
    keywords: ['courses', 'course', 'training', 'learn', 'pilot', 'certification', 'student'],
    response:
      'We offer DGCA-compliant certified Drone Pilot Training, Agriculture Drone Operation, Industrial Survey & Mapping certification, and Drone Assembly & Maintenance workshops with hands-on flight experience.',
    suggestedQuestions: [
      'I am a student.',
      'How can I register?',
      'What services does DroneTV provide?',
    ],
    actionTrigger: 'open_courses',
  },
  {
    keywords: ['contact', 'reach', 'phone', 'email', 'speak', 'call', 'talk', 'address', 'location'],
    response:
      'You can reach DroneTV directly via Email at support@dronetv.in, Phone at +91 88043 49999 / +91 6303230227, or by filling out our online enquiry form.',
    suggestedQuestions: [
      'I want to speak with someone.',
      'How can I register?',
      'What services does DroneTV provide?',
    ],
    actionTrigger: 'contact_direct',
  },
  {
    keywords: ['register', 'enroll', 'join', 'apply', 'signup'],
    response:
      'To register for training or request a service quote, simply submit your details through our Lead Assistant enquiry form! Our team will contact you within 24 hours.',
    suggestedQuestions: [
      'I am a student.',
      'I am interested in a service.',
      'What courses / training are available?',
    ],
    actionTrigger: 'open_form',
  },
  {
    keywords: ['interested in a service', 'interested service', 'need service', 'hire drone', 'custom drone'],
    response:
      'Great! We would love to assist you with our specialized drone services. Please complete the quick enquiry form below, and our technical team will reach out with a custom project proposal.',
    suggestedQuestions: [
      'What services does DroneTV provide?',
      'I want to speak with someone.',
    ],
    actionTrigger: 'open_form',
  },
  {
    keywords: ['i am a student', 'student discount', 'pilot career', 'student training'],
    response:
      'Welcome future drone aviator! We have special student training modules, DGCA certification guidance, and scholarship options available.',
    suggestedQuestions: [
      'What courses / training are available?',
      'How can I register?',
      'I want to speak with someone.',
    ],
    actionTrigger: 'open_form',
  },
  {
    keywords: ['speak with someone', 'human assistant', 'call me', 'talk to agent', 'speak someone'],
    response:
      'We will connect you with a DroneTV specialist! Please leave your contact details in the enquiry form, and an engineer will call you right back.',
    suggestedQuestions: [
      'How can I contact DroneTV?',
      'I am interested in a service.',
    ],
    actionTrigger: 'open_form',
  },
];

const FALLBACK_RESPONSE = {
  response:
    "I'm sorry, I didn't quite catch that. I can help answer questions about DroneTV's services, pilot training courses, contact info, and registration!",
  suggestedQuestions: [
    'What services does DroneTV provide?',
    'What courses / training are available?',
    'How can I contact DroneTV?',
    'How can I register?',
    'I want to speak with someone.',
  ],
};

/**
 * @desc    Process user question and return rule-based response
 * @route   POST /api/chatbot/message
 * @access  Public
 */
export const handleChatMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'A valid text message is required.',
      });
      return;
    }

    const cleanInput = message.toLowerCase().trim();

    // Match input against rules
    const matchedRule = RULES.find((rule) =>
      rule.keywords.some((keyword) => cleanInput.includes(keyword))
    );

    if (matchedRule) {
      res.status(200).json({
        success: true,
        data: {
          reply: matchedRule.response,
          suggestedQuestions: matchedRule.suggestedQuestions || [],
          actionTrigger: matchedRule.actionTrigger || null,
        },
      });
      return;
    }

    // Return fallback response for unmatched query
    res.status(200).json({
      success: true,
      data: {
        reply: FALLBACK_RESPONSE.response,
        suggestedQuestions: FALLBACK_RESPONSE.suggestedQuestions,
        actionTrigger: null,
      },
    });
  } catch (error) {
    next(error);
  }
};
