
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface CompareSliderProps {
  before: React.ReactNode;
  after: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  initialPosition?: number; // 0 to 100
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

const CompareSlider: React.FC<CompareSliderProps> = ({
  before,
  after,
  direction = 'horizontal',
  initialPosition = 50,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    let newPosition = 50;
    if (direction === 'horizontal') {
      const x = clientX - rect.left;
      newPosition = (x / rect.width) * 100;
    } else {
      const y = clientY - rect.top;
      newPosition = (y / rect.height) * 100;
    }

    setPosition(Math.max(0, Math.min(100, newPosition)));
  }, [direction]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX, e.clientY);
    };
    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handleMove]);

  const isHorizontal = direction === 'horizontal';

  return (
    <div 
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl group cursor-col-resize ${className}`}
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* 底部內容 (After) */}
      <div className="w-full h-full">
        {after}
        <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[10px] font-black text-white uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          {afterLabel}
        </div>
      </div>

      {/* 上部內容 (Before) - 裁切層 */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ 
          clipPath: isHorizontal 
            ? `inset(0 ${100 - position}% 0 0)` 
            : `inset(0 0 ${100 - position}% 0)` 
        }}
      >
        {before}
        <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[10px] font-black text-white uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          {beforeLabel}
        </div>
      </div>

      {/* 互動拖動條 */}
      <div 
        className={`absolute z-20 pointer-events-none flex items-center justify-center transition-shadow ${isDragging ? 'drop-shadow-2xl' : 'drop-shadow-md'}`}
        style={{ 
          left: isHorizontal ? `${position}%` : '0',
          top: isHorizontal ? '0' : `${position}%`,
          width: isHorizontal ? '2px' : '100%',
          height: isHorizontal ? '100%' : '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          transform: isHorizontal ? 'translateX(-50%)' : 'translateY(-50%)'
        }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-white/20 pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
          <svg 
            className={`w-5 h-5 text-slate-700 ${isHorizontal ? 'rotate-0' : 'rotate-90'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16l-4-4m0 0l4-4m-4 4h18m-5 4l4-4m0 0l-4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CompareSlider;
