
import React from 'react';
import { StatusType } from '../types';
import Text from './Text';

interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  variant?: 'radial' | 'semi';
  status?: StatusType;
  size?: number;
  className?: string;
}

const Gauge: React.FC<GaugeProps> = ({
  value,
  min = 0,
  max = 100,
  label,
  unit = '',
  variant = 'radial',
  status = 'info',
  size = 200,
  className = '',
}) => {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  const radius = 80;
  const strokeWidth = 12;
  const center = 100;
  
  // Calculate arc parameters
  const isRadial = variant === 'radial';
  const totalAngle = isRadial ? 270 : 180;
  const rotation = isRadial ? 135 : 180;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (totalAngle / 360) * circumference;
  const strokeDashoffset = arcLength - (percentage / 100) * arcLength;

  const statusColors = {
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    error: 'text-rose-500',
    info: 'text-indigo-500',
    neutral: 'text-slate-400',
  };

  const statusGradients = {
    success: ['#10b981', '#34d399'],
    warning: ['#f59e0b', '#fbbf24'],
    error: ['#f43f5e', '#fb7185'],
    info: ['#6366f1', '#818cf8'],
    neutral: ['#94a3b8', '#cbd5e1'],
  };

  const gradientId = `gauge-grad-${status}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} style={{ width: size }}>
      <div className="relative" style={{ width: size, height: isRadial ? size : size * 0.6 }}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full transform transition-transform"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={statusGradients[status][0]} />
              <stop offset="100%" stopColor={statusGradients[status][1]} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            className="text-slate-100"
          />

          {/* Active Fill */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' 
            }}
            strokeLinecap="round"
            filter="url(#glow)"
          />
        </svg>

        {/* Value Overlay */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${isRadial ? '' : '-translate-y-4'}`}>
          <div className="flex items-baseline gap-0.5">
            <span className="text-3xl font-black text-slate-800 tracking-tighter">
              {Math.round(value)}
            </span>
            <span className="text-sm font-bold text-slate-400 uppercase">
              {unit}
            </span>
          </div>
          {label && (
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gauge;
