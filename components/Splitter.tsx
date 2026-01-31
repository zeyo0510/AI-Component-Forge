
import React, { useState, useCallback, useEffect, useRef } from 'react';

interface SplitterProps {
  children: [React.ReactNode, React.ReactNode];
  orientation?: 'horizontal' | 'vertical';
  initialSize?: number; // percentage 0-100
  minSize?: number; // percentage
  maxSize?: number; // percentage
  onResize?: (size: number) => void;
  className?: string;
}

const Splitter: React.FC<SplitterProps> = ({
  children,
  orientation = 'horizontal',
  initialSize = 50,
  minSize = 10,
  maxSize = 90,
  onResize,
  className = '',
}) => {
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDragging = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let newSize = 50;

    if (orientation === 'horizontal') {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const offset = clientX - containerRect.left;
      newSize = (offset / containerRect.width) * 100;
    } else {
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const offset = clientY - containerRect.top;
      newSize = (offset / containerRect.height) * 100;
    }

    const constrainedSize = Math.max(minSize, Math.min(maxSize, newSize));
    setSize(constrainedSize);
    onResize?.(constrainedSize);
  }, [isDragging, orientation, minSize, maxSize, onResize]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchmove', onDrag);
      window.addEventListener('touchend', stopDragging);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging, onDrag, stopDragging]);

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      ref={containerRef}
      className={`flex w-full h-full overflow-hidden ${isHorizontal ? 'flex-row' : 'flex-col'} ${className}`}
      style={{ userSelect: isDragging ? 'none' : 'auto' }}
    >
      {/* First Panel */}
      <div 
        style={{ [isHorizontal ? 'width' : 'height']: `${size}%` }}
        className="overflow-auto custom-scrollbar"
      >
        {children[0]}
      </div>

      {/* Handle */}
      <div
        onMouseDown={startDragging}
        onTouchStart={startDragging}
        className={`
          relative z-50 flex items-center justify-center transition-colors duration-150
          ${isHorizontal ? 'w-1.5 cursor-col-resize h-full' : 'h-1.5 cursor-row-resize w-full'}
          ${isDragging ? 'bg-indigo-600' : 'bg-slate-200 hover:bg-indigo-400'}
        `}
      >
        {/* Decorative Handle Dots */}
        <div className={`
          flex gap-0.5 
          ${isHorizontal ? 'flex-col' : 'flex-row'}
        `}>
          <div className="w-1 h-1 rounded-full bg-white/50" />
          <div className="w-1 h-1 rounded-full bg-white/50" />
          <div className="w-1 h-1 rounded-full bg-white/50" />
        </div>
      </div>

      {/* Second Panel */}
      <div 
        style={{ [isHorizontal ? 'width' : 'height']: `${100 - size}%` }}
        className="overflow-auto custom-scrollbar"
      >
        {children[1]}
      </div>
    </div>
  );
};

export default Splitter;
