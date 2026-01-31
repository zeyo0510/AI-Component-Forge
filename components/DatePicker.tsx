
import React, { useState, useRef, useEffect } from 'react';
import Text from './Text';
import Button from './Button';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select date...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSelectDate = (day: number) => {
    const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(selectedDate);
    setIsOpen(false);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      value &&
      day === value.getDate() &&
      viewDate.getMonth() === value.getMonth() &&
      viewDate.getFullYear() === value.getFullYear()
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const startDay = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

    // Padding for first week
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9" />);
    }

    // Actual days
    for (let d = 1; d <= totalDays; d++) {
      days.push(
        <button
          key={d}
          onClick={() => handleSelectDate(d)}
          className={`
            h-9 w-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center relative group
            ${isSelected(d) 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110 z-10' 
              : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
            }
          `}
        >
          {d}
          {isToday(d) && !isSelected(d) && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full" />
          )}
        </button>
      );
    }
    return days;
  };

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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={`text-sm flex-1 ${value ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
          {value ? formatDate(value) : placeholder}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-slate-200 rounded-3xl shadow-2xl z-[500] w-[320px] animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 px-1">
            <button 
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex flex-col items-center">
               <span className="text-sm font-black text-slate-800 tracking-tight">{monthNames[viewDate.getMonth()]}</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{viewDate.getFullYear()}</span>
            </div>
            <button 
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(wd => (
              <div key={wd} className="h-8 flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-tighter">
                {wd}
              </div>
            ))}
            {renderDays()}
          </div>

          {/* Footer */}
          <div className="pt-3 mt-1 border-t border-slate-50 flex justify-center">
            <button 
              onClick={() => {
                const today = new Date();
                onChange(today);
                setViewDate(today);
                setIsOpen(false);
              }}
              className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] hover:text-indigo-700 transition-colors py-1 px-4"
            >
              Back to Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
