
import React, { useState, useRef, useEffect } from 'react';

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  className?: string;
  contentClassName?: string;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  position = 'bottom',
  align = 'center',
  className = '',
  contentClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const togglePopover = () => setIsOpen(!isOpen);

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const alignClasses = {
    start: position === 'top' || position === 'bottom' ? 'left-0' : '',
    center: position === 'top' || position === 'bottom' ? 'left-1/2 -translate-x-1/2' : '',
    end: position === 'top' || position === 'bottom' ? 'right-0' : '',
  };

  return (
    <div className={`relative inline-block ${className}`} ref={popoverRef}>
      <div onClick={togglePopover} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`
          absolute z-50 min-w-[200px] p-4
          bg-white rounded-xl shadow-2xl border border-slate-200
          animate-in fade-in zoom-in-95 duration-200
          ${positionClasses[position]}
          ${alignClasses[align as keyof typeof alignClasses]}
          ${contentClassName}
        `}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
