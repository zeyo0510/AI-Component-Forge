
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Text from './Text';

interface AngleSliderProps {
  value: number; // 0 - 360
  onChange: (value: number) => void;
  label?: string;
  size?: number;
  className?: string;
}

const AngleSlider: React.FC<AngleSliderProps> = ({
  value,
  onChange,
  label,
  size = 160,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateAngle = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 計算向量
    const dx = clientX - centerX;
    const dy = clientY - centerY;

    // 計算弧度並轉為角度 (atan2 回傳 -PI 到 PI)
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // 調整偏移量，讓 0 度在正上方
    angle = (angle + 90 + 360) % 360;
    
    onChange(Math.round(angle));
  }, [onChange]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    calculateAngle(clientX, clientY);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      calculateAngle(clientX, clientY);
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, calculateAngle]);

  // 手柄位置計算 (0度在上方)
  const radius = (size / 2) - 16;
  const rad = (value - 90) * (Math.PI / 180);
  const handleX = (size / 2) + radius * Math.cos(rad);
  const handleY = (size / 2) + radius * Math.sin(rad);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {label && <Text variant="caption" className="font-black text-slate-400">{label}</Text>}
      
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        className={`relative rounded-full bg-white border border-slate-200 shadow-lg select-none cursor-pointer group transition-shadow ${isDragging ? 'shadow-2xl ring-4 ring-indigo-50' : 'hover:shadow-xl'}`}
        style={{ width: size, height: size }}
      >
        {/* 中心點讀數 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-slate-800 tracking-tighter">{value}°</span>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Angle</span>
        </div>

        {/* 刻度標記 (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
            const rMark = (size / 2) - 8;
            const rRad = (deg - 90) * (Math.PI / 180);
            const x1 = (size / 2) + (rMark - 6) * Math.cos(rRad);
            const y1 = (size / 2) + (rMark - 6) * Math.sin(rRad);
            const x2 = (size / 2) + rMark * Math.cos(rRad);
            const y2 = (size / 2) + rMark * Math.sin(rRad);
            return (
              <line 
                key={deg} 
                x1={x1} y1={y1} x2={x2} y2={y2} 
                stroke="currentColor" 
                strokeWidth={deg % 90 === 0 ? "2" : "1"} 
                className="text-slate-900"
              />
            );
          })}
        </svg>

        {/* 指示針 */}
        <div 
          className="absolute top-1/2 left-1/2 h-0.5 bg-indigo-200 origin-left pointer-events-none transition-all duration-75"
          style={{ 
            width: radius, 
            transform: `translate(0, -50%) rotate(${value - 90}deg)` 
          }}
        />

        {/* 旋鈕手柄 */}
        <div 
          className={`absolute w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 transition-transform ${isDragging ? 'scale-125' : 'group-hover:scale-110'}`}
          style={{ left: handleX, top: handleY }}
        />
      </div>
    </div>
  );
};

export default AngleSlider;
