
import React from 'react';
import { CalendarEvent } from '../types';

interface CalendarProps {
  events?: CalendarEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ events = [] }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">October 2025</h3>
        <div className="flex space-x-2">
          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b border-slate-100">
        {weekDays.map(day => (
          <div key={day} className="py-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`empty-${i}`} className="h-24 border border-slate-50 bg-slate-50/20" />
        ))}
        {days.map(day => {
          const dayEvents = events.filter(e => e.date === `2025-10-${day.toString().padStart(2, '0')}`);
          return (
            <div key={day} className="h-24 border border-slate-50 p-2 hover:bg-slate-50 transition-colors group">
              <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600">{day}</span>
              <div className="mt-1 space-y-1">
                {dayEvents.map((e, idx) => (
                  <div key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 truncate font-medium">
                    {e.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Calendar;
