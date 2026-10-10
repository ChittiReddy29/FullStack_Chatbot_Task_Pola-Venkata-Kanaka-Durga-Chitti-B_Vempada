import React, { useState } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem } from '../types';
import { ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onOpenEnquiryWithInterest: (interest: string, userType?: 'Student' | 'Customer') => void;
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Aerial Surveillance & Security Mapping',
    badge: 'Enterprise Security',
    icon: 'surveillance',
    description: 'High-definition 4K aerial perimeter surveillance, intruder tracking, and real-time GIS spatial mapping.',
    features: [
      'Real-time 4K Encrypted Stream',
      'Autonomous Waypoint Patrols',
      'Thermal & Night-Vision Sensors',
      'GIS Orthomosaic Map Export',
    ],
    useCases: ['Solar Power Plants', 'Mining & Industrial Parks', 'Perimeter Protection'],
  },
  {
    id: '2',
    title: 'Agriculture Crop Health & Precision Spraying',
    badge: 'Agritech',
    icon: 'agriculture',
    description: 'Multispectral crop health analysis (NDVI), automated liquid fertilizer spraying, and precision yield forecasting.',
    features: [
      '10L to 30L Payload Capacity Drones',
      'NDVI Multispectral Crop Analytics',
      'Automated Spot Spraying Algorithms',
      'Field Boundary Autopilot Mapping',
    ],
    useCases: ['Sugarcane & Cotton Fields', 'Fruit Orchards', 'Targeted Pest Control'],
  },
  {
    id: '3',
    title: 'Infrastructure & Thermal Inspection',
    badge: 'Industrial Asset Audit',
    icon: 'inspection',
    description: 'Non-destructive radiometric thermal inspection for bridges, power grids, solar panels, and high-rise structures.',
    features: [
      'Radiometric FLIR Thermal Imaging',
      'Sub-centimeter 3D Mesh Modeling',
      'AI Defect & Hotspot Tagging Reports',
      'Bridge & Chimney Structural Audits',
    ],
    useCases: ['Solar Thermal Audits', 'National Highway Bridges', 'Wind Turbine Rotors'],
  },
  {
    id: '4',
    title: 'Aerial Cinematography & FPV Filming',
    badge: 'Media & Production',
    icon: 'cinematography',
    description: 'Broadcast-grade 4K/8K aerial footage, high-speed indoor FPV drone shots, and live event drone broadcasting.',
    features: [
      'ProRES & RAW Video Capture',
      'Micro-FPV Indoor Flythroughs',
      'Dual Operator Gimbal Control',
      'Live HD Satellite Feed Output',
    ],
    useCases: ['Film & TV Productions', 'Commercial Advertisements', 'Live Sports Events'],
  },
  {
    id: '5',
    title: 'Custom UAV Assembly & Maintenance',
    badge: 'Hardware & Engineering',
    icon: 'repair',
    description: 'Custom drone build outfitting, flight controller tuning, ESC replacement, payload integration, and annual maintenance contracts.',
    features: [
      'Pixhawk & ArduPilot Firmware Tuning',
      'Custom Carbon Fiber Frame Fabrication',
      'Motor & ESC Diagnostics',
      'Rapid Turnaround Spare Parts Supply',
    ],
    useCases: ['Custom Sensor Payloads', 'Fleet Repair Contracts', 'Prototyping R&D'],
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenEnquiryWithInterest }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Enterprise Security', 'Agritech', 'Industrial Asset Audit', 'Media & Production', 'Hardware & Engineering'];

  const filteredServices =
    filterCategory === 'All'
      ? ALL_SERVICES
      : ALL_SERVICES.filter((s) => s.badge === filterCategory);

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> Commercial Drone Solutions
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
          Commercial Drone Services & Engineering
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          From thermal asset inspection to high-volume precision agriculture spraying, DroneTV provides end-to-end aerial tech services backed by licensed pilots and custom UAV hardware.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-sm'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid-cards">
        {filteredServices.map((srv) => (
          <ServiceCard
            key={srv.id}
            service={srv}
            onSelectService={(title) => onOpenEnquiryWithInterest(title, 'Customer')}
          />
        ))}
      </div>
    </div>
  );
};
