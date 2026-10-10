import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { CoursesPage } from './pages/CoursesPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { EnquiryFormModal } from './components/EnquiryFormModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { UserType } from './types';
import { Bot, X } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [modalInterest, setModalInterest] = useState<string>('');
  const [modalUserType, setModalUserType] = useState<UserType>('Customer');

  // Floating Chat Drawer state
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState<boolean>(false);

  const handleOpenEnquiryWithInterest = (interest: string, userType: UserType = 'Customer') => {
    setModalInterest(interest);
    setModalUserType(userType);
    setIsFormModalOpen(true);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            onOpenChat={() => setActiveTab('chatbot')}
            onOpenEnquiry={() => handleOpenEnquiryWithInterest('General Inquiry', 'Customer')}
            onOpenEnquiryWithInterest={handleOpenEnquiryWithInterest}
            setActiveTab={setActiveTab}
          />
        );
      case 'services':
        return <ServicesPage onOpenEnquiryWithInterest={handleOpenEnquiryWithInterest} />;
      case 'courses':
        return <CoursesPage onOpenEnquiryWithInterest={handleOpenEnquiryWithInterest} />;
      case 'chatbot':
        return <ChatbotPage onOpenEnquiryWithInterest={handleOpenEnquiryWithInterest} />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return (
          <HomePage
            onOpenChat={() => setActiveTab('chatbot')}
            onOpenEnquiry={() => handleOpenEnquiryWithInterest('General Inquiry', 'Customer')}
            onOpenEnquiryWithInterest={handleOpenEnquiryWithInterest}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0b0f19] text-gray-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* Navigation header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEnquiry={() => handleOpenEnquiryWithInterest('General Inquiry', 'Customer')}
      />

      {/* Main page content container */}
      <main className="flex-1 pt-8">
        {renderActivePage()}
      </main>

      {/* Floating Chat Drawer Trigger Button */}
      {activeTab !== 'chatbot' && (
        <div className="fixed bottom-6 right-6 z-40">
          {isFloatingChatOpen ? (
            <div className="relative w-[360px] sm:w-[420px] shadow-2xl animate-fade-in">
              <button
                onClick={() => setIsFloatingChatOpen(false)}
                className="absolute -top-3 -right-3 z-50 p-1.5 rounded-full bg-gray-900 border border-white/20 text-white hover:bg-rose-600 transition-colors"
                title="Close floating chat"
              >
                <X className="w-4 h-4" />
              </button>
              <ChatbotWidget
                onOpenEnquiryWithInterest={handleOpenEnquiryWithInterest}
                isFloatingDrawer={true}
              />
            </div>
          ) : (
            <button
              onClick={() => setIsFloatingChatOpen(true)}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 text-white font-heading font-bold shadow-lg shadow-orange-500/40 hover:scale-105 transition-all"
            >
              <Bot className="w-6 h-6 animate-pulse" />
              <span className="text-sm tracking-wide">Ask DroneTV Bot</span>
            </button>
          )}
        </div>
      )}

      {/* Lead Enquiry Modal */}
      <EnquiryFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialInterest={modalInterest}
        initialUserType={modalUserType}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
