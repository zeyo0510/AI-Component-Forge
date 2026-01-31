
import React from 'react';

interface SkeletonProps {
  variant?: 'circle' | 'text' | 'rect';
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className = '',
}) => {
  const baseStyles = 'bg-slate-200 animate-pulse rounded-md';
  
  const variants = {
    circle: 'rounded-full',
    text: 'h-3 w-full mb-2 last:w-3/4 rounded-sm',
    rect: '',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
