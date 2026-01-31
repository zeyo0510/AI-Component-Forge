
import React from 'react';
import { GanttTask } from '../types';
import Text from './Text';
import Tooltip from './Tooltip';

interface GanttProps {
  tasks: GanttTask[];
  totalDays?: number;
  unitWidth?: number;
  className?: string;
}

const Gantt: React.FC<GanttProps> = ({
  tasks,
  totalDays = 30,
  unitWidth = 40,
  className = '',
}) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className={`flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm ${className}`}>
      {/* Timeline Header */}
      <div className="flex border-b border-slate-100 bg-slate-50">
        <div className="w-48 flex-shrink-0 border-r border-slate-200 p-3 font-black text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">
          Project Tasks
        </div>
        <div className="flex-1 overflow-x-auto custom-scrollbar flex">
          {days.map((day) => (
            <div 
              key={day} 
              style={{ width: `${unitWidth}px` }} 
              className="flex-shrink-0 text-center py-3 border-r border-slate-100/50 text-[10px] font-bold text-slate-400"
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Task Rows Container */}
      <div className="flex flex-col overflow-hidden">
        {tasks.map((task) => (
          <div key={task.id} className="flex border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
            {/* Task Info Sidebar */}
            <div className="w-48 flex-shrink-0 border-r border-slate-100 p-4 flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                {task.label}
              </span>
              {task.assignee && (
                <span className="text-[10px] text-slate-400 font-medium">@{task.assignee}</span>
              )}
            </div>

            {/* Timeline Grid & Bars */}
            <div className="flex-1 relative overflow-x-auto custom-scrollbar h-16 flex items-center">
              {/* Grid Background */}
              <div className="absolute inset-0 flex pointer-events-none">
                {days.map((day) => (
                  <div 
                    key={day} 
                    style={{ width: `${unitWidth}px` }} 
                    className="flex-shrink-0 border-r border-slate-50" 
                  />
                ))}
              </div>

              {/* Task Bar */}
              <Tooltip content={`${task.label}: ${task.progress}% Complete`}>
                <div 
                  className={`
                    absolute h-8 rounded-lg shadow-sm border-b-2 transition-all duration-300
                    ${task.type === 'success' ? 'bg-emerald-50 border-emerald-200' : 
                      task.type === 'info' ? 'bg-indigo-50 border-indigo-200' :
                      task.type === 'warning' ? 'bg-amber-50 border-amber-200' : 
                      task.type === 'error' ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}
                  `}
                  style={{ 
                    left: `${task.startDay * unitWidth}px`, 
                    width: `${task.duration * unitWidth}px` 
                  }}
                >
                  {/* Progress Fill */}
                  <div 
                    className={`
                      h-full rounded-l-lg opacity-20 transition-all duration-700
                      ${task.type === 'success' ? 'bg-emerald-600' : 
                        task.type === 'info' ? 'bg-indigo-600' :
                        task.type === 'warning' ? 'bg-amber-600' : 
                        task.type === 'error' ? 'bg-rose-600' : 'bg-slate-600'}
                    `}
                    style={{ width: `${task.progress}%` }}
                  />
                  
                  {/* Status Bar Indicator */}
                  <div 
                    className={`
                      absolute bottom-0 left-0 h-1 rounded-bl-lg transition-all duration-700
                      ${task.type === 'success' ? 'bg-emerald-500' : 
                        task.type === 'info' ? 'bg-indigo-500' :
                        task.type === 'warning' ? 'bg-amber-500' : 
                        task.type === 'error' ? 'bg-rose-500' : 'bg-slate-500'}
                    `}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Legend */}
      <div className="bg-slate-50 p-3 flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Planned</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Success</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> Blocked</div>
        </div>
        <div>View Unit: Days (30D)</div>
      </div>
    </div>
  );
};

export default Gantt;
