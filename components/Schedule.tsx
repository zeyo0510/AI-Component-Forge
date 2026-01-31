
import React from 'react';
import Text from './Text';
import Status from './Status';

interface ScheduleProps {
  tasks: import('../types').ScheduleTask[];
  currentHour?: number;
}

const Schedule: React.FC<ScheduleProps> = ({ tasks, currentHour = 10.5 }) => {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

  const getTaskStyle = (task: import('../types').ScheduleTask) => {
    const top = (task.startHour - 8) * 80; // 80px per hour
    const height = task.duration * 80;
    
    const colors = {
      success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      warning: 'bg-amber-50 border-amber-200 text-amber-700',
      error: 'bg-rose-50 border-rose-200 text-rose-700',
      info: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      neutral: 'bg-slate-50 border-slate-200 text-slate-700',
    };

    return {
      top: `${top}px`,
      height: `${height}px`,
      className: `absolute left-20 right-4 p-3 border-l-4 rounded-r-xl border shadow-sm transition-all hover:shadow-md hover:scale-[1.01] z-10 ${colors[task.type]}`
    };
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <Text variant="h4">Daily Itinerary</Text>
        <Text variant="caption">October 24, 2025</Text>
      </div>
      
      <div className="relative overflow-y-auto custom-scrollbar" style={{ height: '500px' }}>
        {/* Current Time Indicator */}
        <div 
          className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
          style={{ top: `${(currentHour - 8) * 80}px` }}
        >
          <div className="w-16 text-right pr-2 text-[10px] font-black text-rose-500 bg-white">NOW</div>
          <div className="flex-1 h-0.5 bg-rose-500" />
          <div className="w-2 h-2 rounded-full bg-rose-500 -ml-1" />
        </div>

        {/* Hour Grid */}
        <div className="relative">
          {hours.map((hour) => (
            <div key={hour} className="h-[80px] border-b border-slate-50 flex items-start group">
              <div className="w-16 text-right pr-4 pt-2 text-[10px] font-bold text-slate-400 group-hover:text-indigo-500 transition-colors">
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
              </div>
              <div className="flex-1 border-l border-slate-100 h-full" />
            </div>
          ))}

          {/* Tasks Overlay */}
          {tasks.map((task) => {
            const styleObj = getTaskStyle(task);
            return (
              <div key={task.id} style={{ top: styleObj.top, height: styleObj.height }} className={styleObj.className}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{task.category}</span>
                  <span className="text-[10px] font-mono font-bold">{task.duration}h</span>
                </div>
                <h5 className="font-bold text-sm leading-tight truncate">{task.title}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
