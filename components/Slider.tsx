
import React from 'react';

interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, min = 0, max = 100, step = 1, value, onChange }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-center">
        {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
        <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600">
          {value}
        </span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute w-full h-2 bg-slate-100 rounded-full" />
        <div 
          className="absolute h-2 bg-indigo-500 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>
    </div>
  );
};

export default Slider;
