
import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  showValue?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  label, 
  variant = 'default',
  showValue = true 
}) => {
  const colors = {
    default: 'bg-indigo-600',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        {label && <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>}
        {showValue && <span className="text-xs font-bold text-slate-700">{Math.round(progress)}%</span>}
      </div>
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ease-out ${colors[variant]}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
