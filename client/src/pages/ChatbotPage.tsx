import React from 'react';
import { ChatbotWidget } from '../components/ChatbotWidget';
import { Sparkles, Bot, ShieldCheck } from 'lucide-react';

interface ChatbotPageProps {
  onOpenEnquiryWithInterest: (interest: string, userType?: 'Student' | 'Customer') => void;
}

export const ChatbotPage: React.FC<ChatbotPageProps> = ({ onOpenEnquiryWithInterest }) => {
  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto animate-fade-in">
      {/* Header banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Rule-Based & Gemini AI Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          DroneTV AI Support & Lead Assistant
        </h1>
        <p className="text-gray-300 text-sm max-w-xl mx-auto">
          Ask predefined or custom questions about drone services, DGCA pilot training, pricing, contact details, or request a call from our technical team.
        </p>
      </div>

      {/* Embedded Chat Widget */}
      <ChatbotWidget
        onOpenEnquiryWithInterest={onOpenEnquiryWithInterest}
        isFloatingDrawer={false}
      />
    </div>
  );
};
