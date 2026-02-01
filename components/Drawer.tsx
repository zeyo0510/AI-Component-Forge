
import React, { useEffect, useCallback } from 'react';
import Text from './Text';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = 'right',
  size = 'md',
  className = '',
}) => {
  // Handle ESC key to close
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Unlock scroll
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeClasses = {
    horizontal: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-[400px]',
      xl: 'w-[600px]',
      full: 'w-screen',
    },
    vertical: {
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-[400px]',
      xl: 'h-[600px]',
      full: 'h-screen',
    },
  };

  const positionClasses = {
    left: `left-0 inset-y-0 h-full ${sizeClasses.horizontal[size]} border-r slide-in-from-left`,
    right: `right-0 inset-y-0 h-full ${sizeClasses.horizontal[size]} border-l slide-in-from-right`,
    top: `top-0 inset-x-0 w-full ${sizeClasses.vertical[size]} border-b slide-in-from-top`,
    bottom: `bottom-0 inset-x-0 w-full ${sizeClasses.vertical[size]} border-t slide-in-from-bottom`,
  };

  return (
    <div className="fixed inset-0 z-[1000] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={`
          absolute bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-out border-slate-200 animate-in
          ${positionClasses[position]}
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/30">
          <div>
            {title && <Text variant="h4" className="text-slate-900 font-black">{title}</Text>}
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
