
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface WindowProps {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ title, onClose, children, icon }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging via the title bar (not buttons)
    if ((e.target as HTMLElement).closest('button')) return;

    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartPos.current = { x: position.x, y: position.y };
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;

    setPosition({
      x: windowStartPos.current.x + deltaX,
      y: windowStartPos.current.y + deltaY
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      className={`border border-slate-200 rounded-xl overflow-hidden bg-white animate-in zoom-in-95 duration-200 transition-shadow ${isDragging ? 'shadow-2xl z-[500] scale-[1.01]' : 'shadow-xl'}`}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        userSelect: isDragging ? 'none' : 'auto'
      }}
    >
      <div 
        onMouseDown={handleMouseDown}
        className={`bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab hover:bg-slate-100'}`}
      >
        <div className="flex items-center space-x-2 pointer-events-none">
          {icon && <span className="text-slate-500">{icon}</span>}
          <span className="text-sm font-bold text-slate-700 tracking-tight">{title}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            className="w-3.5 h-3.5 rounded-full bg-rose-400 hover:bg-rose-500 transition-colors flex items-center justify-center group"
            title="Close"
          >
            <svg className="w-2 h-2 text-rose-900 opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
      
      {/* Visual resize handle (decorative) */}
      <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-slate-200 rounded-br pointer-events-none" />
    </div>
  );
};

export default Window;
