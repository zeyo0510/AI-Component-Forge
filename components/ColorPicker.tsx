
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Text from './Text';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  presets?: string[];
  className?: string;
}

// 色彩轉換工具函式
const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
};

const hsvToRgb = (h: number, s: number, v: number) => {
  h /= 360; s /= 100; v /= 100;
  let r = 0, g = 0, b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  presets = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#334155', '#ec4899', '#ffffff', '#000000'],
  className = '',
}) => {
  // 內部 HSV 狀態，用於驅動 UI
  const [hsv, setHsv] = useState(() => rgbToHsv(hexToRgb(value).r, hexToRgb(value).g, hexToRgb(value).b));
  const satRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  // 當外部 value 改變時同步內部 HSV
  useEffect(() => {
    if (value.length === 7) {
      const rgb = hexToRgb(value);
      const newHsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      // 避免色相在飽和度為 0 時跳轉（保持用戶的操作直覺）
      setHsv(prev => ({
        ...newHsv,
        h: newHsv.s === 0 ? prev.h : newHsv.h
      }));
    }
  }, [value]);

  const updateColor = useCallback((newHsv: { h: number, s: number, v: number }) => {
    setHsv(newHsv);
    const rgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  }, [onChange]);

  const handleSaturationMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const handleMove = (moveEvent: any) => {
      if (!satRef.current) return;
      const rect = satRef.current.getBoundingClientRect();
      const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const clientY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;
      
      const s = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1) * 100;
      const v = Math.min(Math.max(0, 1 - (clientY - rect.top) / rect.height), 1) * 100;
      updateColor({ ...hsv, s, v });
    };

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
    handleMove(e);
  };

  const handleHueMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const handleMove = (moveEvent: any) => {
      if (!hueRef.current) return;
      const rect = hueRef.current.getBoundingClientRect();
      const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const h = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1) * 360;
      updateColor({ ...hsv, h });
    };

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
    handleMove(e);
  };

  return (
    <div className={`flex flex-col space-y-4 w-72 bg-white p-4 rounded-3xl border border-slate-200 shadow-xl ${className}`}>
      {label && (
        <label className="text-xs font-black text-slate-700 uppercase tracking-widest px-1">
          {label}
        </label>
      )}

      {/* 2D 飽和度/亮度選擇區 */}
      <div 
        ref={satRef}
        onMouseDown={handleSaturationMouseDown}
        onTouchStart={handleSaturationMouseDown}
        className="relative w-full h-40 rounded-2xl cursor-crosshair overflow-hidden"
        style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div 
          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${hsv.s}%`, top: `${100 - hsv.v}%` }}
        />
      </div>

      {/* 色相滑桿 */}
      <div className="space-y-2 px-1">
        <div 
          ref={hueRef}
          onMouseDown={handleHueMouseDown}
          onTouchStart={handleHueMouseDown}
          className="relative h-4 w-full rounded-full cursor-pointer"
          style={{ background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }}
        >
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-slate-200 rounded-full shadow-lg -translate-x-1/2"
            style={{ left: `${(hsv.h / 360) * 100}%` }}
          />
        </div>
      </div>

      {/* 預覽與 Hex 輸入 */}
      <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div 
          className="w-10 h-10 rounded-xl shadow-inner flex-shrink-0"
          style={{ backgroundColor: value }}
        />
        <div className="flex-1 relative">
           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">#</span>
           <input
             type="text"
             value={value.replace('#', '').toUpperCase()}
             onChange={(e) => {
               const val = e.target.value;
               if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                 onChange(`#${val}`);
               }
             }}
             className="w-full pl-7 pr-3 py-1.5 bg-transparent font-mono text-sm font-bold text-slate-700 outline-none"
             placeholder="FFFFFF"
           />
        </div>
      </div>

      {/* 預設色盤 */}
      <div className="grid grid-cols-5 gap-2 px-1">
        {presets.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`
              aspect-square rounded-lg border-2 transition-all hover:scale-110 active:scale-95
              ${value.toLowerCase() === color.toLowerCase() ? 'border-indigo-600 ring-2 ring-indigo-100 scale-105 shadow-md' : 'border-white shadow-sm'}
            `}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
