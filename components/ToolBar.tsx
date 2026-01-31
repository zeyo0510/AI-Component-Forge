
import React from 'react';

interface ToolBarProps {
  children: React.ReactNode;
  variant?: 'bordered' | 'flat';
  className?: string;
}

const ToolBar: React.FC<ToolBarProps> = ({ 
  children, 
  variant = 'bordered', 
  className = '' 
}) => {
  return (
    <div className={`
      flex items-center gap-1 p-1.5 
      ${variant === 'bordered' ? 'bg-slate-50 border border-slate-200 rounded-xl' : 'bg-transparent'}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const ToolBarSeparator = () => (
  <div className="w-[1px] h-4 bg-slate-300 mx-1.5 self-center" />
);

export const ToolBarGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-0.5 px-1">
    {children}
  </div>
);

export default ToolBar;
