
import React from 'react';
import Text from './Text';
import Status from './Status';

interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
  status: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative pl-8 space-y-10">
      {/* Connector Line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100" />

      {events.map((event, idx) => (
        <div key={idx} className="relative group">
          {/* Bullet Point */}
          <div className={`absolute -left-[29px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm transition-transform group-hover:scale-125 z-10 ${
            event.status === 'success' ? 'bg-emerald-500' :
            event.status === 'warning' ? 'bg-amber-500' :
            event.status === 'error' ? 'bg-rose-500' : 'bg-indigo-500'
          }`}>
             {event.icon && <div className="absolute inset-0 flex items-center justify-center text-white scale-[0.6]">{event.icon}</div>}
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-slate-200">
            <div className="flex justify-between items-start mb-2">
              <Text variant="h4" className="text-sm font-black">{event.title}</Text>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase">{event.time}</span>
            </div>
            {event.description && <p className="text-xs text-slate-500 leading-relaxed mb-4">{event.description}</p>}
            <div className="flex gap-2">
              <Status type={event.status} label={event.status.toUpperCase()} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
