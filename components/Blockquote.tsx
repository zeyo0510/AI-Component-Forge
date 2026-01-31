
import React from 'react';
import { StatusType } from '../types';
import Text from './Text';

interface BlockquoteProps {
  children: React.ReactNode;
  author?: string;
  cite?: string;
  variant?: StatusType | 'primary';
  className?: string;
}

const Blockquote: React.FC<BlockquoteProps> = ({
  children,
  author,
  cite,
  variant = 'primary',
  className = '',
}) => {
  const themes = {
    primary: 'bg-indigo-50/50 border-indigo-500 text-indigo-900',
    success: 'bg-emerald-50/50 border-emerald-500 text-emerald-900',
    warning: 'bg-amber-50/50 border-amber-500 text-amber-900',
    error: 'bg-rose-50/50 border-rose-500 text-rose-900',
    info: 'bg-sky-50/50 border-sky-500 text-sky-900',
    neutral: 'bg-slate-50 border-slate-300 text-slate-700',
  };

  const iconColors = {
    primary: 'text-indigo-200',
    success: 'text-emerald-200',
    warning: 'text-amber-200',
    error: 'text-rose-200',
    info: 'text-sky-200',
    neutral: 'text-slate-200',
  };

  return (
    <blockquote className={`relative p-6 md:p-8 border-l-4 rounded-r-2xl overflow-hidden ${themes[variant]} ${className}`}>
      {/* 裝飾性大引號 */}
      <div className={`absolute -top-4 -left-2 opacity-30 pointer-events-none select-none ${iconColors[variant]}`}>
        <svg width="80" height="80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1 15C1 18.3137 3.68629 21 7 21H10V18C10 16.8954 9.10457 16 8 16H5C4.44772 16 4 15.5523 4 15V9C4 8.44772 4.44772 8 5 8H8C9.10457 8 10 7.10457 10 6V5C10 3.89543 9.10457 3 8 3H5C2.79086 3 1 4.79086 1 7V15Z" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="text-lg md:text-xl font-medium italic leading-relaxed mb-4">
          {children}
        </div>
        
        {(author || cite) && (
          <footer className="flex items-center gap-3">
            <div className="h-0.5 w-8 bg-current opacity-30" />
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sm">
              {author && <span className="font-bold tracking-tight">{author}</span>}
              {author && cite && <span className="hidden md:inline opacity-40">•</span>}
              {cite && <cite className="not-italic opacity-60 font-medium">{cite}</cite>}
            </div>
          </footer>
        )}
      </div>
    </blockquote>
  );
};

export default Blockquote;
