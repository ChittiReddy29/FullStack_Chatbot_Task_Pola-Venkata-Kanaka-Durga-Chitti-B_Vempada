import React from 'react';
import { Bot, Mail, Phone, MapPin, ShieldCheck, Github, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#070a12] border-t border-white/10 pt-16 pb-8 text-gray-400 text-sm">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-heading">DroneTV</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">
            DroneTV is India’s premier drone services, technology, and pilot training ecosystem. Empowering enterprise surveillance, agriculture precision, and DGCA certified aviators.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Full Stack Internship Project
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white font-heading mb-4 text-base">Quick Navigation</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-cyan-400 transition-colors">
                Home & Overview
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('services')} className="hover:text-cyan-400 transition-colors">
                Drone Services
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('courses')} className="hover:text-cyan-400 transition-colors">
                DGCA Pilot Courses
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('chatbot')} className="hover:text-cyan-400 transition-colors">
                AI Chatbot Assistant
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className="hover:text-cyan-400 transition-colors">
                Contact & Lead Form
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('admin')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                Admin Dashboard <ExternalLink className="w-3 h-3 text-cyan-400" />
              </button>
            </li>
          </ul>
        </div>

        {/* Services & Training */}
        <div>
          <h4 className="font-semibold text-white font-heading mb-4 text-base">Key Capabilities</h4>
          <ul className="space-y-2.5 text-xs">
            <li>Aerial Mapping & 3D Modeling</li>
            <li>Thermal & Infrastructure Inspection</li>
            <li>Agriculture Crop Spraying</li>
            <li>DGCA Remote Pilot Certification</li>
            <li>Custom UAV Assembly & Repair</li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-semibold text-white font-heading mb-4 text-base">Get In Touch</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>pindipolu@ipageums.com</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>+91 88043 49999 / +91 6303230227</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>IPAGE Group Tech Hub, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© {new Date().getFullYear()} DroneTV AI Support & Lead Assistant. IPAGE Group Assignment.</p>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Developed with React, TypeScript, Express & MongoDB</span>
        </div>
      </div>
    </footer>
  );
};
