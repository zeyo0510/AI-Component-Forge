
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Text from './Text';

interface RangeProps {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const Range: React.FC<RangeProps> = ({ label, min, max, step = 1, value, onChange }) => {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  const minValRef = useRef(value[0]);
  const maxValRef = useRef(value[1]);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get updated value and pass to onChange
  useEffect(() => {
    onChange([minVal, maxVal]);
  }, [minVal, maxVal]);

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
        <div className="flex items-center space-x-2">
           <span className="text-[10px] font-mono font-bold bg-indigo-50 px-2 py-0.5 rounded text-indigo-600 border border-indigo-100">
            {minVal}
          </span>
          <span className="text-slate-300">—</span>
          <span className="text-[10px] font-mono font-bold bg-indigo-50 px-2 py-0.5 rounded text-indigo-600 border border-indigo-100">
            {maxVal}
          </span>
        </div>
      </div>

      <div className="relative h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left z-[3] absolute w-full h-0 appearance-none pointer-events-none outline-none"
          style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right z-[4] absolute w-full h-0 appearance-none pointer-events-none outline-none"
        />

        <div className="relative w-full h-2 bg-slate-100 rounded-full">
          <div ref={range} className="absolute h-2 bg-indigo-500 rounded-full" />
        </div>
      </div>

      <style>{`
        .thumb::-webkit-slider-thumb {
          background-color: #ffffff;
          border: 2px solid #4f46e5;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          cursor: pointer;
          height: 20px;
          width: 20px;
          margin-top: 4px;
          pointer-events: all;
          position: relative;
          -webkit-appearance: none;
          transition: transform 0.2s ease;
        }
        .thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .thumb::-webkit-slider-thumb:active {
          transform: scale(0.95);
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default Range;
