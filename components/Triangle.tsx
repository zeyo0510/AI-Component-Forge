
import React from 'react';

// Added optional children to satisfy strict type checking in some environments
interface TriangleProps {
  size?: number;
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
}

const Triangle: React.FC<TriangleProps> = ({
  size = 64,
  color = '#6366f1', // indigo-500
  direction = 'up',
  className = '',
}) => {
  const rotation = {
    up: 'rotate-0',
    right: 'rotate-90',
    down: 'rotate-180',
    left: 'rotate-270',
  };

  return (
    <div className={`inline-block transition-transform duration-300 hover:scale-110 ${rotation[direction]} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <path
          d="M50 10L90 85H10L50 10Z"
          fill={color}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Triangle;
