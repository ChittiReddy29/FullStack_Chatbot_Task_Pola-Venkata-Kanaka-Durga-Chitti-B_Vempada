import React from 'react';
import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { CourseCard } from '../components/CourseCard';
import { ServiceItem, CourseItem } from '../types';
import { ShieldCheck, Bot, Zap, Award, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onOpenChat: () => void;
  onOpenEnquiry: () => void;
  onOpenEnquiryWithInterest: (interest: string, userType?: 'Student' | 'Customer') => void;
  setActiveTab: (tab: string) => void;
}

const SAMPLE_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Aerial Surveillance & Security Mapping',
    badge: 'Enterprise',
    icon: 'surveillance',
    description: 'High-definition 4K aerial perimeter surveillance, perimeter breach detection, and real-time GIS spatial mapping.',
    features: ['Real-time 4K Live Stream', 'Automated Flight Waypoints', 'Night-vision & Thermal Sensors'],
    useCases: ['Industrial Sites', 'Solar Farms', 'Infrastructure Safety'],
  },
  {
    id: '2',
    title: 'Agriculture Crop Spraying & Health Mapping',
    badge: 'Agritech',
    icon: 'agriculture',
    description: 'Multispectral crop health analysis (NDVI), automated liquid fertilizer spraying, and precision yield forecasting.',
    features: ['10L - 30L Payload Spray Drones', 'NDVI Crop Health Analytics', 'Spot Spraying Algorithms'],
    useCases: ['Cotton & Sugarcane Fields', 'Orchards', 'Pest Control'],
  },
  {
    id: '3',
    title: 'Infrastructure & Thermal Structural Inspection',
    badge: 'Industrial',
    icon: 'inspection',
    description: 'Non-destructive radiometric thermal inspection for bridges, power grids, solar panels, and high-rise structures.',
    features: ['FLIR Thermal Sensor Payload', 'Sub-centimeter 3D Modeling', 'AI Defect Tagging Reports'],
    useCases: ['Solar Thermal Audits', 'Bridge Inspection', 'Wind Turbines'],
  },
];

const SAMPLE_COURSES: CourseItem[] = [
  {
    id: 'c1',
    title: 'DGCA Certified Remote Pilot License (RPC)',
    category: 'Certification',
    duration: '5 Days Intensive',
    certification: 'DGCA Approved',
    level: 'Beginner to Pro',
    description: 'Official DGCA approved drone pilot training course covering theory, simulator training, and live flight logging.',
    highlights: ['Licensed Simulator Training', 'Dual Flight Log Hours', 'DGCA License Exam Prep'],
    syllabus: ['Aerodynamics & Aviation Law', 'Weather & Flight Planning', 'Emergency Procedures'],
  },
  {
    id: 'c2',
    title: 'Agriculture Spray Drone Operations Specialist',
    category: 'Agritech Training',
    duration: '3 Days Workshop',
    certification: 'DroneTV Specialization',
    level: 'Intermediate',
    description: 'Hands-on training for operating heavy agricultural spray UAVs, payload mixing, flight path planning, and field safety.',
    highlights: ['30L Spray Drone Flight Experience', 'Nozzle & Flow Calibration', 'NDVI Mapping Overview'],
    syllabus: ['Precision Spray Algorithms', 'Safety Protocols', 'Field Maintenance'],
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  onOpenChat,
  onOpenEnquiry,
  onOpenEnquiryWithInterest,
  setActiveTab,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <Hero
        onOpenChat={onOpenChat}
        onOpenEnquiry={onOpenEnquiry}
        onExploreServices={() => setActiveTab('services')}
      />

      {/* Why Choose DroneTV Section */}
      <section className="container">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> Industry Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Why DroneTV Platform Lead Assistant?
          </h2>
          <p className="text-gray-300 text-sm">
            We bridge commercial UAV engineering with automated AI lead generation and DGCA pilot education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 space-y-3 border-cyan-500/20 hover:border-cyan-500/40">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">24/7 Rule-Based AI Assistant</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Instant responses to user questions regarding drone services, pilot eligibility, and course syllabi with session persistence.
            </p>
          </div>

          <div className="glass-panel p-6 space-y-3 border-blue-500/20 hover:border-blue-500/40">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">End-to-End REST Lead Capture</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Validated customer & student submissions stored in MongoDB, with real-time status management for team administrators.
            </p>
          </div>

          <div className="glass-panel p-6 space-y-3 border-emerald-500/20 hover:border-emerald-500/40">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">DGCA Compliant Training</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Comprehensive flight training curricula, licensed flight simulators, and professional certification guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="container space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Commercial Offerings</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">Featured Drone Services</h2>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="text-xs font-semibold text-cyan-400 hover:text-white flex items-center gap-1"
          >
            View All Services <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid-cards">
          {SAMPLE_SERVICES.map((srv) => (
            <ServiceCard
              key={srv.id}
              service={srv}
              onSelectService={(title) => onOpenEnquiryWithInterest(title, 'Customer')}
            />
          ))}
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="container space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Pilot Academy</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">Featured Pilot Training</h2>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-semibold text-blue-400 hover:text-white flex items-center gap-1"
          >
            View All Courses <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_COURSES.map((crs) => (
            <CourseCard
              key={crs.id}
              course={crs}
              onEnroll={(title) => onOpenEnquiryWithInterest(title, 'Student')}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
