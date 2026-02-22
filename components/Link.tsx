
import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'subtle' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  underline?: 'none' | 'hover' | 'always';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const Link: React.FC<LinkProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  underline = 'hover',
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'text-indigo-600 hover:text-indigo-700',
    secondary: 'text-slate-600 hover:text-slate-900',
    subtle: 'text-slate-400 hover:text-slate-600',
    danger: 'text-rose-600 hover:text-rose-700',
  };

  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const underlines = {
    none: 'no-underline',
    hover: 'no-underline hover:underline',
    always: 'underline',
  };

  const baseStyles = 'inline-flex items-center gap-1.5 font-medium transition-colors duration-200 cursor-pointer';

  return (
    <a
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${underlines[underline]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </a>
  );
};

export default Link;
