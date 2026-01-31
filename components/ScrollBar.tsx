
import React, { useRef } from 'react';

interface ScrollBarProps {
  children: React.ReactNode;
  height?: string;
  maxHeight?: string;
  horizontal?: boolean;
}

const ScrollArea: React.FC<ScrollBarProps> = ({ 
  children, 
  height = '300px', 
  maxHeight, 
  horizontal = false 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ 
      top: scrollRef.current.scrollHeight, 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="relative group">
      <div 
        ref={scrollRef}
        className={`custom-scrollbar overflow-auto border border-slate-200 rounded-xl bg-white shadow-inner p-4 ${horizontal ? 'whitespace-nowrap' : ''}`}
        style={{ height, maxHeight }}
      >
        {children}
      </div>
      
      {!horizontal && (
        <div className="absolute right-4 bottom-4 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={scrollToTop}
            className="p-1.5 bg-white/90 backdrop-blur shadow-md rounded-full border border-slate-200 text-slate-400 hover:text-indigo-600 transition-all hover:scale-110"
            title="Scroll to Top"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button 
            onClick={scrollToBottom}
            className="p-1.5 bg-white/90 backdrop-blur shadow-md rounded-full border border-slate-200 text-slate-400 hover:text-indigo-600 transition-all hover:scale-110"
            title="Scroll to Bottom"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollArea;
