
import React from 'react';

// Added optional children to satisfy strict type checking in some environments
interface CircleProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
  pulse?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Circle: React.FC<CircleProps> = ({
  size = 'md',
  color = 'bg-indigo-500',
  pulse = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    '2xl': 'w-48 h-48',
  };

  return (
    <div className="relative inline-block">
      {pulse && (
        <div className={`absolute inset-0 ${color} rounded-full animate-ping opacity-25`} />
      )}
      <div
        className={`
          ${sizeClasses[size]} 
          ${color} 
          rounded-full 
          shadow-lg 
          relative 
          z-10 
          transition-transform 
          duration-300 
          hover:scale-110
          ${className}
        `}
      />
    </div>
  );
};

export default Circle;
