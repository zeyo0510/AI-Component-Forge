
import React from 'react';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white' | 'slate';
  thickness?: 'thin' | 'normal' | 'thick';
  className?: string;
  label?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  thickness = 'normal',
  className = '',
  label,
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variants = {
    primary: 'text-indigo-600',
    secondary: 'text-emerald-600',
    white: 'text-white',
    slate: 'text-slate-400',
  };

  const thicknesses = {
    thin: 'border-2',
    normal: 'border-[3px]',
    thick: 'border-4',
  };

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`
          ${sizes[size]}
          ${variants[variant]}
          ${thicknesses[thickness]}
          animate-spin
          rounded-full
          border-current
          border-t-transparent
        `}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {label && (
        <span className="text-xs font-medium text-slate-500 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};

export default Spinner;
