
import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  /* Making children optional to satisfy strict type checking where self-closing tags or nested structures are used */
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'flat' | 'outline' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  accent?: 'none' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  onClick?: () => void;
  // Added id prop to support element targeting for features like onboarding tours
  id?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  headerAction,
  footer,
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hoverable = false,
  accent = 'none',
  onClick,
  // Extracting id from props
  id,
}) => {
  const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300 relative flex flex-col';
  
  const variants = {
    default: 'bg-white border border-slate-200 shadow-sm',
    flat: 'bg-slate-100 border border-transparent',
    outline: 'bg-transparent border-2 border-slate-200',
    glass: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-lg',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const accents = {
    none: '',
    primary: 'border-t-4 border-t-indigo-600',
    success: 'border-t-4 border-t-emerald-500',
    warning: 'border-t-4 border-t-amber-500',
    error: 'border-t-4 border-t-rose-500',
    info: 'border-t-4 border-t-sky-500',
  };

  const interactionStyles = onClick ? 'cursor-pointer active:scale-[0.98]' : '';
  const hoverStyles = hoverable ? 'hover:shadow-xl hover:-translate-y-1 hover:border-slate-300' : '';

  return (
    <div 
      // Applying id to the root container
      id={id}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${accents[accent]} 
        ${interactionStyles} 
        ${hoverStyles} 
        ${className}
      `}
      onClick={onClick}
    >
      {(title || subtitle || headerAction) && (
        <div className={`px-6 py-4 flex items-start justify-between ${variant === 'glass' ? 'bg-white/30' : 'bg-slate-50/50'} border-b border-slate-100/50`}>
          <div className="flex-1 pr-4">
            {title && (
              <h3 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && (
            <div className="flex-shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}
      
      <div className={`${paddings[padding]} flex-1`}>
        {children}
      </div>
      
      {footer && (
        <div className={`px-6 py-4 border-t border-slate-100/50 ${variant === 'glass' ? 'bg-white/20' : 'bg-slate-50/30'}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
