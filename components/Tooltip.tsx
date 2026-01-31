
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-[250] ${positionClasses[position]} px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-200`}>
          {content}
          <div className="absolute w-2 h-2 bg-slate-900 rotate-45 left-1/2 -translate-x-1/2 -bottom-1" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
