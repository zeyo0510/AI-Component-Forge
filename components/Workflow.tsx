
import React from 'react';
import Text from './Text';

interface WorkflowProps {
  steps: import('../types').WorkflowStep[];
  title?: string;
}

const Workflow: React.FC<WorkflowProps> = ({ steps, title }) => {
  return (
    <div className="space-y-6">
      {title && <Text variant="h4" className="mb-4">{title}</Text>}
      <div className="relative pl-12 space-y-8">
        {/* Connector Line Track */}
        <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-slate-100" />
        
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isActive = step.status === 'running';
          const isDone = step.status === 'completed';
          const isError = step.status === 'failed';
          
          return (
            <div key={step.id} className="relative group">
              {/* Vertical line segment for active progress */}
              {!isLast && (isDone || isActive) && (
                <div 
                  className={`absolute left-[-25px] top-8 w-0.5 z-0 transition-all duration-1000 ${
                    isDone ? 'bg-emerald-500 h-full' : 'bg-indigo-500 h-1/2 animate-pulse'
                  }`}
                />
              )}

              {/* Step Node Icon */}
              <div className={`
                absolute -left-[48px] top-1 w-12 h-12 rounded-full border-4 border-white shadow-md z-10 flex items-center justify-center transition-all duration-300
                ${isDone ? 'bg-emerald-500' : isActive ? 'bg-indigo-600 animate-pulse scale-110' : isError ? 'bg-rose-500' : 'bg-slate-200'}
              `}>
                {isDone && (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isActive && (
                  <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                )}
                {isError && (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {step.status === 'pending' && (
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                )}
              </div>

              {/* Content Card */}
              <div className={`
                bg-white border p-5 rounded-2xl transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5
                ${isActive ? 'border-indigo-200 ring-4 ring-indigo-50' : 'border-slate-100'}
              `}>
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <h5 className={`font-bold text-sm ${isActive ? 'text-indigo-600' : 'text-slate-800'}`}>
                      {step.label}
                    </h5>
                    {isActive && (
                      <span className="text-[9px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
                        Processing
                      </span>
                    )}
                  </div>
                  {step.duration && (
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {step.duration}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.description}
                </p>
                
                {isError && (
                  <div className="mt-3 p-2 bg-rose-50 border border-rose-100 rounded-lg text-[10px] text-rose-700 font-mono">
                    ERROR: Connection timeout on port 443. Retrying in 5s...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Workflow;
