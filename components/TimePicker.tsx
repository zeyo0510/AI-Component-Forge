
import React, { useState, useRef, useEffect } from 'react';
import Text from './Text';

interface TimePickerProps {
  value: string; // "HH:mm" or "HH:mm AM/PM"
  onChange: (time: string) => void;
  label?: string;
  use12Hours?: boolean;
  minuteStep?: number;
  placeholder?: string;
  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
  use12Hours = false,
  minuteStep = 1,
  placeholder = 'Select time...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value
  const parseTime = () => {
    if (!value) return { hour: 12, minute: 0, period: 'AM' };
    
    if (use12Hours) {
      const [timePart, period] = value.split(' ');
      const [h, m] = timePart.split(':').map(Number);
      return { hour: h, minute: m, period: period || 'AM' };
    } else {
      const [h, m] = value.split(':').map(Number);
      return { hour: h, minute: m, period: 'AM' };
    }
  };

  const { hour, minute, period } = parseTime();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newH: number, newM: number, newP: string) => {
    let timeStr = '';
    const formattedH = newH.toString().padStart(2, '0');
    const formattedM = newM.toString().padStart(2, '0');
    
    if (use12Hours) {
      timeStr = `${formattedH}:${formattedM} ${newP}`;
    } else {
      timeStr = `${formattedH}:${formattedM}`;
    }
    onChange(timeStr);
  };

  const hours = use12Hours 
    ? Array.from({ length: 12 }, (_, i) => i + 1) 
    : Array.from({ length: 24 }, (_, i) => i);
    
  const minutes = Array.from(
    { length: Math.ceil(60 / minuteStep) }, 
    (_, i) => i * minuteStep
  );

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 px-0.5">
          {label}
        </label>
      )}

      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 h-11 bg-white border rounded-xl cursor-pointer transition-all
          ${isOpen ? 'border-indigo-500 ring-4 ring-indigo-50 shadow-sm' : 'border-slate-200 hover:border-slate-300 shadow-sm'}
        `}
      >
        <svg className={`w-4 h-4 transition-colors ${isOpen ? 'text-indigo-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className={`text-sm flex-1 ${value ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
          {value || placeholder}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-3xl shadow-2xl z-[500] w-[280px] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
          <div className="flex h-64">
            {/* Hours Column */}
            <div className="flex-1 overflow-y-auto custom-scrollbar border-r border-slate-50 py-2">
              <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center mb-2">Hour</div>
              {hours.map(h => (
                <button
                  key={h}
                  onClick={() => handleSelect(h, minute, period)}
                  className={`w-full py-2.5 text-sm font-bold transition-all ${
                    h === hour ? 'bg-indigo-600 text-white shadow-inner scale-110' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {h.toString().padStart(2, '0')}
                </button>
              ))}
            </div>

            {/* Minutes Column */}
            <div className="flex-1 overflow-y-auto custom-scrollbar border-r border-slate-50 py-2">
              <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center mb-2">Min</div>
              {minutes.map(m => (
                <button
                  key={m}
                  onClick={() => handleSelect(hour, m, period)}
                  className={`w-full py-2.5 text-sm font-bold transition-all ${
                    m === minute ? 'bg-indigo-600 text-white shadow-inner scale-110' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {m.toString().padStart(2, '0')}
                </button>
              ))}
            </div>

            {/* Period Column (AM/PM) */}
            {use12Hours && (
              <div className="w-16 flex flex-col items-center justify-center bg-slate-50/50 py-2">
                <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center mb-4">Period</div>
                {['AM', 'PM'].map(p => (
                  <button
                    key={p}
                    onClick={() => handleSelect(hour, minute, p)}
                    className={`px-3 py-2 rounded-lg text-xs font-black transition-all mb-2 ${
                      p === period ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-center">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-6 py-2 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-indigo-600 hover:text-white transition-all"
            >
              Confirm Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
