
import React from 'react';
import Text from './Text';
import Status from './Status';
import { BoardColumn, BoardTask } from '../types';

interface BoardProps {
  columns: BoardColumn[];
  onTaskClick?: (task: BoardTask) => void;
}

const PriorityBadge: React.FC<{ priority: BoardTask['priority'] }> = ({ priority }) => {
  const styles = {
    low: 'bg-slate-100 text-slate-600',
    medium: 'bg-amber-50 text-amber-700 border-amber-100',
    high: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${styles[priority]}`}>
      {priority}
    </span>
  );
};

const TaskCard: React.FC<{ task: BoardTask; onClick?: () => void }> = ({ task, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-grab active:cursor-grabbing group"
    >
      <div className="flex justify-between items-start mb-2">
        <PriorityBadge priority={task.priority} />
        <div className="flex -space-x-2">
          {task.assignee && (
            <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-600 overflow-hidden shadow-sm" title={task.assignee.name}>
              {task.assignee.avatar ? (
                <img src={task.assignee.avatar} alt={task.assignee.name} className="w-full h-full object-cover" />
              ) : (
                task.assignee.name.charAt(0)
              )}
            </div>
          )}
        </div>
      </div>
      <h5 className="text-sm font-bold text-slate-800 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
        {task.title}
      </h5>
      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {task.description}
        </p>
      )}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map(tag => (
            <span key={tag} className="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded uppercase tracking-tighter border border-slate-100">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const Board: React.FC<BoardProps> = ({ columns, onTaskClick }) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar min-h-[600px] items-start">
      {columns.map((column) => (
        <div 
          key={column.id} 
          className="flex-shrink-0 w-80 bg-slate-100/50 rounded-2xl border border-slate-200/60 p-4 flex flex-col max-h-full"
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <Text variant="h4" className="text-sm font-black text-slate-700 uppercase tracking-tight">
                {column.title}
              </Text>
              <span className="bg-white px-2 py-0.5 rounded-full text-[10px] font-black text-slate-400 border border-slate-200">
                {column.tasks.length}
              </span>
            </div>
            <button className="text-slate-400 hover:text-indigo-600 p-1 rounded-lg hover:bg-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-1 pb-2">
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} onClick={() => onTaskClick?.(task)} />
            ))}
            
            <button className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-white transition-all group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-widest">Add Task</span>
            </button>
          </div>
        </div>
      ))}
      
      {/* New Column Placeholder */}
      <button className="flex-shrink-0 w-80 h-16 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-white transition-all group">
        <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-sm font-bold uppercase tracking-widest">Add New Column</span>
      </button>
    </div>
  );
};

export default Board;
