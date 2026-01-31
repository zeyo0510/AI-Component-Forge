
import React, { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '9:16' | 'auto';
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  shadow?: boolean;
  filter?: 'none' | 'blur' | 'grayscale' | 'sepia';
  zoomOnHover?: boolean;
  overlay?: React.ReactNode;
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  fit = 'cover',
  rounded = 'xl',
  shadow = true,
  filter = 'none',
  zoomOnHover = false,
  overlay,
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    'auto': '',
  };

  const fitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  };

  const filterClasses = {
    none: '',
    blur: 'blur-[2px]',
    grayscale: 'grayscale',
    sepia: 'sepia',
  };

  return (
    <div 
      className={`
        relative overflow-hidden group 
        ${aspectClasses[aspectRatio]} 
        ${roundedClasses[rounded]} 
        ${shadow ? 'shadow-lg' : ''} 
        ${className} 
        bg-slate-100
      `}
    >
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center z-0">
          <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`
          w-full h-full 
          ${fitClasses[fit]} 
          ${filterClasses[filter]}
          transition-all duration-700 ease-out
          ${zoomOnHover ? 'group-hover:scale-110' : ''}
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Optional Overlay Layer */}
      {overlay && (
        <div className="absolute inset-0 z-10 pointer-events-none group-hover:pointer-events-auto">
          {overlay}
        </div>
      )}
    </div>
  );
};

export default Image;
