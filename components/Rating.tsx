
import React, { useState } from 'react';

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onChange,
  readOnly = false,
  size = 'md',
  label,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const activeValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
          {label}
        </span>
      )}
      <div 
        className="flex items-center gap-1"
        onMouseLeave={() => !readOnly && setHoverValue(null)}
        role="group"
        aria-label={label || 'Rating'}
      >
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= activeValue;

          return (
            <button
              key={i}
              type="button"
              disabled={readOnly}
              onMouseEnter={() => !readOnly && setHoverValue(starValue)}
              onClick={() => !readOnly && onChange?.(starValue)}
              className={`transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-sm ${
                readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'
              }`}
              aria-label={`Rate ${starValue} out of ${max}`}
            >
              <svg
                className={`${sizes[size]} ${
                  isFilled 
                    ? 'text-amber-400 fill-current' 
                    : 'text-slate-200 fill-none'
                } stroke-current`}
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
                />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
