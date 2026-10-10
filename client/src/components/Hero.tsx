import React from 'react';
import { Bot, ArrowRight, Zap, Award, Users, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
  onOpenEnquiry: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat, onOpenEnquiry, onExploreServices }) => {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '4rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
      }}>
        {/* Left Column: Headlines & Call to Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            color: '#38bdf8',
            fontSize: '0.75rem',
            fontWeight: 700,
            width: 'fit-content',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <Zap style={{ width: '14px', height: '14px', color: '#06b6d4' }} />
            Next-Gen Drone Operations & AI Assistant
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#ffffff',
          }}>
            Empowering Sky Tech with <span className="gradient-text">DroneTV AI Lead Assistant</span>
          </h1>

          <p style={{
            color: '#9ca3af',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            maxWidth: '600px',
          }}>
            Your automated 24/7 intelligent companion for DGCA Drone Pilot Certifications, Agriculture Thermal Surveying, Enterprise Aerial Mapping, and Instant Customer Support.
          </p>

          {/* Action Button Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', paddingTop: '8px' }}>
            <button
              onClick={onOpenChat}
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              <Bot style={{ width: '20px', height: '20px' }} /> Launch AI Chatbot
            </button>
            <button
              onClick={onOpenEnquiry}
              className="btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              Submit Lead Enquiry <ArrowRight style={{ width: '18px', height: '18px', color: '#06b6d4' }} />
            </button>
          </div>

          {/* Highlights checklist */}
          <div style={{
            paddingTop: '1.5rem',
            marginTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '0.85rem',
            color: '#d1d5db',
            fontWeight: 500,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 style={{ width: '18px', height: '18px', color: '#06b6d4' }} />
              <span>Rule-Based Bot Support</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 style={{ width: '18px', height: '18px', color: '#06b6d4' }} />
              <span>DGCA Aligned Syllabi</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 style={{ width: '18px', height: '18px', color: '#06b6d4' }} />
              <span>Instant Lead Capture</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Glass Card */}
        <div>
          <div className="glass-panel" style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            borderColor: 'rgba(6, 182, 212, 0.35)',
          }}>
            {/* Header Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.05em' }}>AI ASSISTANT ACTIVE</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', background: 'rgba(255, 255, 255, 0.05)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>v2.4 Live</span>
            </div>

            {/* Quick Demo Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.9)',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.85rem',
                color: '#e2e8f0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(6, 182, 212, 0.2)',
                  color: '#06b6d4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Bot style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#ffffff' }}>Bot Assistant</p>
                  <p style={{ marginTop: '2px', color: '#cbd5e1' }}>"Hello! What drone training course or commercial service are you looking for?"</p>
                </div>
              </div>

              <div style={{
                background: 'rgba(6, 182, 212, 0.12)',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                fontSize: '0.85rem',
                color: '#7dd3fc',
                marginLeft: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span>User: "I am a student interested in DGCA pilot training"</span>
                <span style={{ fontSize: '10px', color: '#38bdf8', opacity: 0.8 }}>Just now</span>
              </div>
            </div>

            {/* Metric counters */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '4px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Users style={{ width: '18px', height: '18px', color: '#06b6d4' }} /> 1,250+
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>Leads Captured</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Award style={{ width: '18px', height: '18px', color: '#10b981' }} /> 100%
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>Response Rate</div>
              </div>
            </div>

            <button
              onClick={onExploreServices}
              className="btn-outline-cyan"
              style={{ padding: '12px', fontSize: '0.85rem', width: '100%' }}
            >
              Explore Commercial Services & Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
