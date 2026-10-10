import React from 'react';
import { ServiceItem } from '../types';
import { Shield, Eye, Compass, Camera, Wrench, CheckCircle } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService: (serviceTitle: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  surveillance: <Eye className="w-6 h-6 text-orange-400" />,
  agriculture: <Compass className="w-6 h-6 text-emerald-400" />,
  inspection: <Shield className="w-6 h-6 text-amber-400" />,
  cinematography: <Camera className="w-6 h-6 text-orange-400" />,
  repair: <Wrench className="w-6 h-6 text-rose-400" />,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectService }) => {
  return (
    <div className="glass-panel p-6 flex flex-col justify-between h-full group hover:border-orange-500/40">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            {iconMap[service.icon] || <Shield className="w-6 h-6 text-orange-400" />}
          </div>
          <span className="badge badge-new">{service.badge}</span>
        </div>

        <h3 className="text-xl font-bold font-heading text-white group-hover:text-orange-400 transition-colors">
          {service.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed">
          {service.description}
        </p>

        <div className="space-y-2 pt-2 border-t border-white/5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Key Capabilities</p>
          <ul className="space-y-1.5 text-xs text-gray-300">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-white/10">
        <button
          onClick={() => onSelectService(service.title)}
          className="w-full btn-outline-cyan text-xs py-2.5 flex items-center justify-center gap-2"
        >
          Enquire About Service
        </button>
      </div>
    </div>
  );
};
