
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Text from './Text';

interface TrackBarProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  showTicks?: boolean;
  tickInterval?: number;
  showLabels?: boolean;
  className?: string;
}

const TrackBar: React.FC<TrackBarProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  showTicks = true,
  tickInterval,
  showLabels = true,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const interval = tickInterval || (max - min) / 10;

  const calculateValue = useCallback((clientX: number) => {
    if (!trackRef.current) return value;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Number(steppedValue.toFixed(2));
  }, [min, max, step, value]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    onChange(calculateValue(e.clientX));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onChange(calculateValue(e.clientX));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, calculateValue, onChange]);

  const percentage = ((value - min) / (max - min)) * 100;

  // Generate ticks
  const ticks = [];
  if (showTicks) {
    for (let i = min; i <= max; i += interval) {
      ticks.push(i);
    }
  }

  return (
    <div className={`w-full select-none ${className}`}>
      <div className="flex justify-between items-center mb-4">
        {label && <Text variant="small" className="font-bold text-slate-700">{label}</Text>}
        <div className="px-2 py-0.5 bg-indigo-600 text-white font-mono text-[10px] font-bold rounded shadow-sm">
          {value}
        </div>
      </div>

      <div 
        className="relative h-12 flex flex-col justify-center cursor-pointer group"
        onMouseDown={handleMouseDown}
      >
        {/* Main Track */}
        <div 
          ref={trackRef}
          className="relative h-1.5 w-full bg-slate-200 rounded-full overflow-hidden"
        >
          <div 
            className="absolute h-full bg-indigo-500 transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Tick Marks Layer */}
        {showTicks && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-4 pointer-events-none">
            {ticks.map((tick, i) => {
              const tickPos = ((tick - min) / (max - min)) * 100;
              const isMajor = tick === min || tick === max || i % 2 === 0;
              return (
                <div 
                  key={tick}
                  className={`absolute top-0 w-[1px] transform -translate-x-1/2 transition-colors ${
                    isMajor ? 'h-4 bg-slate-400' : 'h-2 mt-1 bg-slate-300'
                  }`}
                  style={{ left: `${tickPos}%` }}
                />
              );
            })}
          </div>
        )}

        {/* Labels Layer */}
        {showLabels && (
          <div className="absolute inset-x-0 bottom-[-4px] w-full pointer-events-none">
            {ticks.filter((_, i) => i % 2 === 0).map((tick) => {
              const tickPos = ((tick - min) / (max - min)) * 100;
              return (
                <span 
                  key={`label-${tick}`}
                  className="absolute transform -translate-x-1/2 text-[9px] font-bold text-slate-400"
                  style={{ left: `${tickPos}%` }}
                >
                  {tick}
                </span>
              );
            })}
          </div>
        )}

        {/* Thumb (Handle) */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-indigo-600 rounded-full shadow-lg z-10 transition-transform ${
            isDragging ? 'scale-125 ring-4 ring-indigo-100' : 'group-hover:scale-110'
          }`}
          style={{ left: `calc(${percentage}% - 10px)` }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        >
          {isDragging && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded animate-in fade-in slide-in-from-bottom-1">
              {value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackBar;
