import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { getBotResponse, PREDEFINED_QUESTIONS, INITIAL_BOT_MESSAGE } from '../services/chatbotRules';
import { Bot, Send, RotateCcw, User, Sparkles, MessageSquare, ChevronRight, FileText } from 'lucide-react';

interface ChatbotWidgetProps {
  onOpenEnquiryWithInterest?: (interest: string, userType?: 'Student' | 'Customer') => void;
  isFloatingDrawer?: boolean;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  onOpenEnquiryWithInterest,
  isFloatingDrawer = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('dronetv_chat_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse chat session');
      }
    }
    return [INITIAL_BOT_MESSAGE];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('dronetv_chat_session', JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      const botReplyData = await getBotResponse(queryText);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyData.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: botReplyData.suggestedQuestions,
        actionTrigger: botReplyData.actionTrigger,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (botReplyData.actionTrigger === 'open_form' && onOpenEnquiryWithInterest) {
        const isStudentQuery = queryText.toLowerCase().includes('student');
        onOpenEnquiryWithInterest(
          queryText,
          isStudentQuery ? 'Student' : 'Customer'
        );
      }
    }, 400);
  };

  const handleResetChat = () => {
    if (window.confirm('Are you sure you want to reset the conversation history?')) {
      setMessages([INITIAL_BOT_MESSAGE]);
      localStorage.removeItem('dronetv_chat_session');
    }
  };

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      height: isFloatingDrawer ? '540px' : '640px',
      width: '100%',
      overflow: 'hidden',
      borderColor: 'rgba(249, 115, 22, 0.35)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
    }}>
      {/* Header Bar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}>
              <Bot style={{ width: '22px', height: '22px' }} />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '10px',
              height: '10px',
              background: '#10b981',
              border: '2px solid #0f172a',
              borderRadius: '50%',
            }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              DroneTV Assistant
              <Sparkles style={{ width: '16px', height: '16px', color: '#f97316' }} />
            </h3>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500 }}>Rule-Based AI Support • Online</p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#9ca3af',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '6px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          <RotateCcw style={{ width: '14px', height: '14px' }} />
          Reset
        </button>
      </div>

      {/* Predefined Quick Questions Bar */}
      <div style={{
        background: 'rgba(7, 10, 18, 0.8)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        flexShrink: 0,
      }} className="no-scrollbar">
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#f97316', flexShrink: 0, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MessageSquare style={{ width: '13px', height: '13px' }} /> Quick Presets:
        </span>
        {PREDEFINED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            style={{
              flexShrink: 0,
              fontSize: '12px',
              color: '#e2e8f0',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '4px 12px',
              borderRadius: '999px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div style={{
        flex: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflowY: 'auto',
        background: 'rgba(11, 15, 25, 0.7)',
      }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                flexDirection: isUser ? 'row-reverse' : 'row',
              }}
              className="animate-fade-in"
            >
              {/* Avatar */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isUser ? '#ea580c' : 'rgba(249, 115, 22, 0.15)',
                  border: isUser ? 'none' : '1px solid rgba(249, 115, 22, 0.35)',
                  color: isUser ? '#ffffff' : '#f97316',
                }}
              >
                {isUser ? <User style={{ width: '18px', height: '18px' }} /> : <Bot style={{ width: '18px', height: '18px' }} />}
              </div>

              {/* Message Box */}
              <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    background: isUser
                      ? 'linear-gradient(135deg, #f97316 0%, #d97706 100%)'
                      : 'rgba(17, 24, 39, 0.95)',
                    color: isUser ? '#ffffff' : '#e2e8f0',
                    border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}
                </div>

                {/* Suggested Question Chips (Bot only) */}
                {!isUser && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '4px' }}>
                    {msg.suggestedQuestions.map((sq, sqIdx) => (
                      <button
                        key={sqIdx}
                        onClick={() => handleSendMessage(sq)}
                        style={{
                          fontSize: '11px',
                          color: '#fed7aa',
                          background: 'rgba(249, 115, 22, 0.12)',
                          border: '1px solid rgba(249, 115, 22, 0.3)',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          textAlign: 'left',
                        }}
                      >
                        <ChevronRight style={{ width: '12px', height: '12px', color: '#f97316', flexShrink: 0 }} />
                        {sq}
                      </button>
                    ))}
                  </div>
                )}

                {/* Optional trigger CTA */}
                {!isUser && msg.actionTrigger === 'open_form' && onOpenEnquiryWithInterest && (
                  <div style={{ paddingTop: '4px' }}>
                    <button
                      onClick={() => onOpenEnquiryWithInterest(msg.text, 'Customer')}
                      className="btn-primary"
                      style={{ fontSize: '11px', padding: '6px 12px' }}
                    >
                      <FileText style={{ width: '14px', height: '14px' }} /> Open Lead Enquiry Form
                    </button>
                  </div>
                )}

                <div style={{ fontSize: '10px', color: '#64748b', textAlign: isUser ? 'right' : 'left', padding: '0 4px' }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot style={{ width: '18px', height: '18px', margin: 'auto' }} />
            </div>
            <div style={{ background: 'rgba(17, 24, 39, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 16px', borderRadius: '4px 16px 16px 16px', display: 'flex', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        style={{
          padding: '12px 16px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about services, DGCA courses, or contact..."
          className="form-input"
          style={{ flex: 1, padding: '10px 14px', fontSize: '0.875rem' }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="btn-primary"
          style={{ padding: '10px 16px', borderRadius: '10px' }}
        >
          <Send style={{ width: '16px', height: '16px' }} />
        </button>
      </form>
    </div>
  );
};
