
import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';
import Text from './Text';

// Added optional children to satisfy strict type checking in some environments
interface TimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
  children?: React.ReactNode;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds = 300, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(initialSeconds);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      onComplete?.();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, onComplete]);

  const toggle = () => setIsActive(!isActive);
  
  const reset = () => {
    setIsActive(false);
    setSeconds(totalTime);
  };

  const setPreset = (s: number) => {
    setIsActive(false);
    setTotalTime(s);
    setSeconds(s);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? (seconds / totalTime) * 100 : 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-8">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-48 h-48 -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset, 
              transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' 
            }}
            className={`${seconds === 0 ? 'text-emerald-500' : 'text-indigo-600'}`}
            strokeLinecap="round"
          />
        </svg>

        <div className="flex flex-col items-center z-10">
          <span className={`text-4xl font-black font-mono tracking-tighter ${seconds === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
            {formatTime(seconds)}
          </span>
          <Text variant="caption" className="text-[10px] mt-1">Remaining</Text>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full max-w-xs">
        <Button 
          onClick={toggle} 
          variant={isActive ? 'outline' : 'primary'} 
          className="flex-1"
        >
          {isActive ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              PAUSE
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              START
            </span>
          )}
        </Button>
        <Button onClick={reset} variant="ghost" className="p-2 border border-slate-100">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
        {[60, 300, 600].map((s) => (
          <button
            key={s}
            onClick={() => setPreset(s)}
            className={`py-2 text-[10px] font-black rounded-xl border transition-all ${
              totalTime === s 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
            }`}
          >
            {s / 60} MIN
          </button>
        ))}
      </div>

      {seconds === 0 && (
        <div className="text-center animate-in zoom-in-95 duration-300">
           <Text variant="small" className="text-emerald-600 font-bold uppercase tracking-widest">Session Complete</Text>
        </div>
      )}
    </div>
  );
};

export default Timer;
