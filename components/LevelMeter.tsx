
import React from 'react';

interface LevelMeterProps {
  value: number; // 0 to 100
  segments?: number;
  label?: string;
  showValue?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const LevelMeter: React.FC<LevelMeterProps> = ({
  value,
  segments = 20,
  label,
  showValue = true,
  orientation = 'horizontal',
  className = '',
}) => {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const activeSegments = Math.round((normalizedValue / 100) * segments);

  const getSegmentColor = (index: number) => {
    const ratio = index / segments;
    if (ratio > 0.85) return 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'; // Peak
    if (ratio > 0.65) return 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'; // Warning
    return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'; // Normal
  };

  const isVertical = orientation === 'vertical';

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center px-1">
          {label && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-[10px] font-mono text-slate-400">
              {Math.round(normalizedValue)}%
            </span>
          )}
        </div>
      )}
      
      <div 
        className={`
          bg-slate-900 p-1 rounded-sm border border-slate-800 flex gap-0.5
          ${isVertical ? 'flex-col-reverse h-48 w-6' : 'flex-row w-full h-6'}
        `}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < activeSegments;
          return (
            <div
              key={i}
              className={`
                flex-1 rounded-[1px] transition-all duration-150
                ${isActive ? getSegmentColor(i) : 'bg-slate-800'}
              `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LevelMeter;
