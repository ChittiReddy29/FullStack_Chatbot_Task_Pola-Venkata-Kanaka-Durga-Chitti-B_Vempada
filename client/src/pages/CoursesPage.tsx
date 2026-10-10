import React from 'react';
import { CourseCard } from '../components/CourseCard';
import { CourseItem } from '../types';
import { BookOpen, GraduationCap, Award, Shield } from 'lucide-react';

interface CoursesPageProps {
  onOpenEnquiryWithInterest: (interest: string, userType?: 'Student' | 'Customer') => void;
}

const ALL_COURSES: CourseItem[] = [
  {
    id: 'c1',
    title: 'DGCA Certified Remote Pilot License (RPC)',
    category: 'Commercial License',
    duration: '5 Days (30 Hours)',
    certification: 'DGCA Approved License',
    level: 'Beginner to Advanced',
    description: 'Official DGCA-aligned remote pilot license training covering regulations, simulator flying, live flight logging, and flight test evaluation.',
    highlights: [
      '10 Hours Certified Simulator Training',
      'Live Flight Logging on Micro & Small Drones',
      'Air Traffic Control & Airspace Rules',
      'Official DGCA Certificate Assistance',
    ],
    syllabus: [
      'Day 1: Aviation Regulations & Aerodynamics',
      'Day 2: Flight Simulator Controls & Meteorology',
      'Day 3: Drone Assembly & Pre-flight Checklist',
      'Day 4: Live Flight Operations & Emergency Procedures',
      'Day 5: Practical Flying Assessment & Licensing',
    ],
  },
  {
    id: 'c2',
    title: 'Agriculture Spray Drone Specialist Certification',
    category: 'Agritech',
    duration: '3 Days Intensive',
    certification: 'DroneTV Academy Specialist',
    level: 'Intermediate',
    description: 'Master the operation of 10L to 30L heavy agricultural spray drones, chemical mixing safety, field boundary flight planning, and nozzle calibration.',
    highlights: [
      'Hands-on Operation of 30L Spray UAVs',
      'Chemical Payload Safety & Nozzle Flow',
      'NDVI Crop Health Mapping Intro',
      'Agri Entrepreneurship Guidance',
    ],
    syllabus: [
      'Day 1: Spray Drone Hardware & Flow Systems',
      'Day 2: Autonomous Field Boundary Mapping',
      'Day 3: Live Spray Operations & Maintenance',
    ],
  },
  {
    id: 'c3',
    title: 'Industrial Aerial Surveying & GIS Mapping Course',
    category: 'GIS & Mapping',
    duration: '4 Days Program',
    certification: 'DroneTV GIS Professional',
    level: 'Intermediate to Advanced',
    description: 'Learn 3D terrain modeling, photogrammetry data processing using Pix4D/Agisoft, RTK/PPK GCP placement, and contour map generation.',
    highlights: [
      'RTK/PPK GPS Ground Control Points (GCP)',
      'Pix4D & Agisoft Photogrammetry Processing',
      '3D Orthomosaic & Contour Generation',
      'Digital Elevation Model (DEM) Export',
    ],
    syllabus: [
      'Day 1: Survey Flight Planning & GCP Placement',
      'Day 2: Data Acquisition & Sensor Calibration',
      'Day 3: Photogrammetry Processing in Pix4D',
      'Day 4: CAD & GIS Export Workflows',
    ],
  },
  {
    id: 'c4',
    title: 'Advanced Drone Hardware Maintenance & Repair',
    category: 'Engineering & Hardware',
    duration: '4 Days Workshop',
    certification: 'Hardware Specialist',
    level: 'All Skill Levels',
    description: 'Practical training on soldering, flight controller flashing (ArduPilot/Betaflight), motor replacement, ESC troubleshooting, and battery maintenance.',
    highlights: [
      'Complete Drone Disassembly & Assembly',
      'Pixhawk & Cube Autopilot Wiring',
      'Soldering & Component Repair',
      'Diagnostics & Flight Testing',
    ],
    syllabus: [
      'Day 1: Electronics & Circuit Fundamentals',
      'Day 2: Soldering & Motor/ESC Wiring',
      'Day 3: Autopilot Calibration & Firmware',
      'Day 4: Bench Testing & Troubleshooting',
    ],
  },
];

export const CoursesPage: React.FC<CoursesPageProps> = ({ onOpenEnquiryWithInterest }) => {
  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" /> Pilot Academy & Training
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
          DGCA Compliant Drone Pilot Courses
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Launch your career in the booming drone industry. We provide certified pilot license training, agriculture drone operation, GIS mapping, and hardware assembly workshops.
        </p>
      </div>

      {/* Academy Perks */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 text-center border-blue-500/20">
          <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="font-bold text-white text-sm font-heading">DGCA Approved</div>
          <div className="text-[11px] text-gray-400">Official Pilot Certification</div>
        </div>

        <div className="glass-panel p-4 text-center border-cyan-500/20">
          <BookOpen className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <div className="font-bold text-white text-sm font-heading">Simulators & Live Flight</div>
          <div className="text-[11px] text-gray-400">Real flight log hours</div>
        </div>

        <div className="glass-panel p-4 text-center border-emerald-500/20">
          <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <div className="font-bold text-white text-sm font-heading">Job Placement Assistance</div>
          <div className="text-[11px] text-gray-400">Industry network links</div>
        </div>

        <div className="glass-panel p-4 text-center border-purple-500/20">
          <GraduationCap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="font-bold text-white text-sm font-heading">Student Scholarships</div>
          <div className="text-[11px] text-gray-400">Fee concessions available</div>
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ALL_COURSES.map((crs) => (
          <CourseCard
            key={crs.id}
            course={crs}
            onEnroll={(title) => onOpenEnquiryWithInterest(title, 'Student')}
          />
        ))}
      </div>
    </div>
  );
};
