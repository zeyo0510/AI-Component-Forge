
import React, { useState, useRef, useEffect } from 'react';
import { MenuItem } from '../types';

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
}

const Menu: React.FC<MenuProps> = ({ trigger, items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div 
        onClick={toggleMenu} 
        className="cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-56 origin-top-${align} rounded-xl bg-white shadow-xl ring-1 ring-slate-200 focus:outline-none z-[300] animate-in fade-in zoom-in-95 duration-150 py-1.5`}
        >
          {items.map((item, index) => {
            if (item.type === 'separator') {
              return (
                <div 
                  key={`sep-${index}`} 
                  className="my-1 border-t border-slate-100" 
                  role="separator"
                />
              );
            }

            const isDanger = item.variant === 'danger';
            const isDisabled = item.disabled;

            return (
              <button
                key={index}
                role="menuitem"
                disabled={isDisabled}
                onClick={() => {
                  if (isDisabled) return;
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`group flex w-full items-center px-4 py-2 text-sm transition-all text-left
                  ${isDisabled 
                    ? 'opacity-40 cursor-not-allowed text-slate-400' 
                    : isDanger
                      ? 'text-rose-600 hover:bg-rose-50'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                  }
                `}
              >
                {item.icon && (
                  <span className={`mr-3 transition-colors ${
                    isDisabled ? 'text-slate-300' : isDanger ? 'text-rose-400 group-hover:text-rose-600' : 'text-slate-400 group-hover:text-indigo-600'
                  }`}>
                    {item.icon}
                  </span>
                )}
                <span className="flex-1 truncate">{item.label}</span>
                {!isDisabled && (
                  <div className={`w-1.5 h-1.5 rounded-full transition-transform scale-0 group-hover:scale-100 ${
                    isDanger ? 'bg-rose-500' : 'bg-indigo-500'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;
