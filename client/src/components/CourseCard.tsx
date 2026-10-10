import React from 'react';
import { CourseItem } from '../types';
import { BookOpen, Clock, Award, CheckCircle, ChevronRight } from 'lucide-react';

interface CourseCardProps {
  course: CourseItem;
  onEnroll: (courseTitle: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <div className="glass-panel p-6 flex flex-col justify-between h-full group hover:border-amber-500/40">
      <div className="space-y-4">
        {/* Header badges */}
        <div className="flex items-center justify-between">
          <span className="badge badge-student">{course.category}</span>
          <span className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 font-medium">
            {course.level}
          </span>
        </div>

        <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-400 transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-gray-300 py-1">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>{course.certification}</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">
          {course.description}
        </p>

        {/* Highlights */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Course Highlights</p>
          <ul className="space-y-1.5 text-xs text-gray-300">
            {course.highlights.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-white/10">
        <button
          onClick={() => onEnroll(course.title)}
          className="w-full btn-primary py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
        >
          Enroll as Student <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
