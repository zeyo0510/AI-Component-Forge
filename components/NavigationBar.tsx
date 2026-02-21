
import React from 'react';
import { NavItem, StatusType } from '../types';
import Status from './Status';

interface NavigationBarProps {
  logo?: React.ReactNode;
  title?: string;
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  rightContent?: React.ReactNode;
  variant?: 'default' | 'glass' | 'dark';
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  logo,
  title,
  items,
  activeId,
  onSelect,
  rightContent,
  variant = 'default',
  className = '',
}) => {
  const variants = {
    default: 'bg-white border-b border-slate-200 text-slate-900',
    glass: 'bg-white/70 backdrop-blur-md border-b border-white/20 text-slate-900',
    dark: 'bg-slate-900 border-b border-slate-800 text-white',
  };

  const itemVariants = {
    default: {
      active: 'text-indigo-600 bg-indigo-50',
      inactive: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
    },
    glass: {
      active: 'text-indigo-600 bg-indigo-50/50',
      inactive: 'text-slate-600 hover:bg-white/50 hover:text-slate-900',
    },
    dark: {
      active: 'text-white bg-white/10',
      inactive: 'text-slate-400 hover:bg-white/5 hover:text-white',
    },
  };

  return (
    <nav className={`h-16 flex items-center px-4 md:px-8 sticky top-0 z-50 transition-all duration-300 ${variants[variant]} ${className}`}>
      {/* Logo & Title */}
      <div className="flex items-center gap-3 mr-8">
        {logo && <div className="flex-shrink-0">{logo}</div>}
        {title && <span className="font-black text-lg tracking-tighter uppercase">{title}</span>}
      </div>

      {/* Nav Items */}
      <div className="hidden md:flex items-center gap-1 h-full">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const currentItemVariant = itemVariants[variant];
          
          return (
            <button
              key={item.id}
              onClick={() => onSelect?.(item.id)}
              className={`
                px-4 h-10 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-200 relative
                ${isActive ? currentItemVariant.active : currentItemVariant.inactive}
              `}
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              <span>{item.label}</span>
              
              {item.badge && (
                <Status 
                  type={item.badgeVariant || 'info'} 
                  label={item.badge.toString()} 
                  className="scale-75 -mr-1"
                />
              )}

              {isActive && variant !== 'dark' && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Content */}
      {rightContent && (
        <div className="flex items-center gap-4">
          {rightContent}
        </div>
      )}

      {/* Mobile Menu Trigger (Placeholder) */}
      <div className="md:hidden flex items-center">
        <button className="p-2 rounded-lg hover:bg-slate-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
