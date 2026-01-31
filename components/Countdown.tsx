
import React, { useState, useEffect, useMemo } from 'react';
import Text from './Text';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

interface CountdownProps {
  targetDate: string | Date;
  title?: string;
  variant?: 'primary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ 
  targetDate, 
  title, 
  variant = 'primary',
  size = 'md',
  onComplete 
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, total: difference };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextValue = calculateTimeLeft();
      setTimeLeft(nextValue);

      if (nextValue.total <= 0 && !isFinished) {
        setIsFinished(true);
        onComplete?.();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isFinished]);

  const themes = {
    primary: 'text-indigo-600 border-indigo-100 bg-indigo-50/30',
    success: 'text-emerald-600 border-emerald-100 bg-emerald-50/30',
    danger: 'text-rose-600 border-rose-100 bg-rose-50/30',
  };

  const rings = {
    primary: 'stroke-indigo-500',
    success: 'stroke-emerald-500',
    danger: 'stroke-rose-500',
  };

  const isCritical = variant === 'danger' && timeLeft.total < 60000 && timeLeft.total > 0;

  const renderSegment = (value: number, label: string, max: number) => {
    const progress = (value / max) * 100;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const sizeStyles = {
      sm: { container: 'w-16 h-16', ring: 'w-16 h-16', font: 'text-lg', label: 'text-[8px]' },
      md: { container: 'w-24 h-24', ring: 'w-24 h-24', font: 'text-3xl', label: 'text-[10px]' },
      lg: { container: 'w-32 h-32', ring: 'w-32 h-32', font: 'text-5xl', label: 'text-xs' },
    }[size];

    return (
      <div className="flex flex-col items-center">
        <div className={`relative ${sizeStyles.container} flex items-center justify-center rounded-2xl shadow-sm border border-slate-100 bg-white group hover:shadow-md transition-shadow`}>
          {/* Progress Ring */}
          <svg className={`absolute inset-0 ${sizeStyles.ring} -rotate-90`} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear' }}
              className={`${rings[variant]}`}
            />
          </svg>

          <div className="flex flex-col items-center z-10">
            <span className={`font-black tracking-tighter ${sizeStyles.font} ${themes[variant].split(' ')[0]}`}>
              {value.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        <span className={`mt-3 font-bold uppercase tracking-widest text-slate-400 ${sizeStyles.label}`}>
          {label}
        </span>
      </div>
    );
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center py-8 animate-in zoom-in-95 duration-500">
        <div className={`p-6 rounded-full ${themes[variant]} mb-4`}>
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <Text variant="h3" className="text-slate-800">Event Commenced</Text>
        <Text variant="small">The countdown has reached zero.</Text>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center space-y-8 ${isCritical ? 'animate-pulse' : ''}`}>
      {title && (
        <div className="text-center">
          <Text variant="caption" className="mb-1 block">{title}</Text>
          {isCritical && <span className="text-[10px] font-black text-rose-500 animate-bounce">CRITICAL TIME REMAINING</span>}
        </div>
      )}
      
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        {renderSegment(timeLeft.days, 'Days', 30)}
        {renderSegment(timeLeft.hours, 'Hours', 24)}
        {renderSegment(timeLeft.minutes, 'Mins', 60)}
        {renderSegment(timeLeft.seconds, 'Secs', 60)}
      </div>
    </div>
  );
};

export default Countdown;
