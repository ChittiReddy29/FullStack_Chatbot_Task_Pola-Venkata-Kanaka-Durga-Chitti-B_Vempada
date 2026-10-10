import React, { useState } from 'react';
import { Bot, Navigation, ShieldCheck, PhoneCall, Layers, BookOpen, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Navigation },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'courses', label: 'Courses & Training', icon: BookOpen },
    { id: 'chatbot', label: 'AI Assistant', icon: Bot },
    { id: 'contact', label: 'Contact Us', icon: PhoneCall },
    { id: 'admin', label: 'Admin Portal', icon: ShieldCheck },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      backgroundColor: 'rgba(11, 15, 25, 0.85)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px',
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(6, 182, 212, 0.3)',
          }}>
            <Bot style={{ width: '24px', height: '24px', color: '#ffffff' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: '#ffffff' }}>DroneTV</span>
              <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '999px', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', border: '1px solid rgba(6, 182, 212, 0.3)', fontWeight: 700 }}>AI LABS</span>
            </div>
            <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.05em' }}>AERIAL INTELLIGENCE PLATFORM</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(17, 24, 39, 0.7)',
          padding: '6px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                  background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  color: isActive ? '#38bdf8' : '#d1d5db',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon style={{ width: '16px', height: '16px', color: isActive ? '#38bdf8' : '#9ca3af' }} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onOpenEnquiry}
            className="btn-primary"
            style={{ fontSize: '0.875rem', padding: '10px 20px' }}
          >
            Enquire Now
          </button>
        </div>
      </div>
    </header>
  );
};
