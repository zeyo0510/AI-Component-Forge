
import React from 'react';

// Added optional children to satisfy strict type checking in some environments
interface RectangleProps {
  width?: string;
  height?: string;
  color?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  border?: boolean;
  className?: string;
  shadow?: boolean;
  children?: React.ReactNode;
}

const Rectangle: React.FC<RectangleProps> = ({
  width = 'w-full',
  height = 'h-32',
  color = 'bg-indigo-500',
  rounded = 'xl',
  border = false,
  className = '',
  shadow = true,
}) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  return (
    <div
      className={`
        ${width} 
        ${height} 
        ${color} 
        ${roundedClasses[rounded]} 
        ${border ? 'border-2 border-slate-200' : ''} 
        ${shadow ? 'shadow-lg' : ''} 
        transition-all duration-300 hover:scale-[1.02]
        ${className}
      `}
    />
  );
};

export default Rectangle;
