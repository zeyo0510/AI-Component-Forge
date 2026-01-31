
import React from 'react';
import { StatusType } from '../types';

interface RibbonProps {
  text: string;
  variant?: StatusType | 'primary';
  position?: 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Ribbon: React.FC<RibbonProps> = ({
  text,
  variant = 'primary',
  position = 'top-right',
  size = 'md',
  className = '',
}) => {
  const themes = {
    primary: 'bg-indigo-600 text-white',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-rose-500 text-white',
    info: 'bg-sky-500 text-white',
    neutral: 'bg-slate-500 text-white',
  };

  const sizes = {
    sm: 'text-[9px] py-0.5 w-[100px] top-[14px]',
    md: 'text-[11px] py-1 w-[130px] top-[20px]',
    lg: 'text-[13px] py-1.5 w-[160px] top-[28px]',
  };

  const positionStyles = {
    'top-right': 'right-[-35px] rotate-45 origin-center',
    'top-left': 'left-[-35px] -rotate-45 origin-center',
  };

  // Offset adjustments based on size for top-left/right precision
  const offsetAdjustments = {
    'top-right': {
      sm: 'right-[-30px]',
      md: 'right-[-35px]',
      lg: 'right-[-40px]',
    },
    'top-left': {
      sm: 'left-[-30px]',
      md: 'left-[-35px]',
      lg: 'left-[-40px]',
    }
  };

  return (
    <div className={`absolute top-0 z-50 pointer-events-none overflow-hidden h-32 w-32 ${position === 'top-right' ? 'right-0' : 'left-0'} ${className}`}>
      <div
        className={`
          absolute 
          text-center 
          font-black 
          uppercase 
          tracking-widest 
          shadow-lg 
          ${themes[variant]} 
          ${sizes[size]} 
          ${offsetAdjustments[position][size]}
          ${position === 'top-right' ? 'rotate-45' : '-rotate-45'}
        `}
      >
        {text}
      </div>
    </div>
  );
};

export default Ribbon;
