
import React, { useState, useEffect, useRef } from 'react';

interface NumericTextBoxProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const NumericTextBox: React.FC<NumericTextBoxProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision = 0,
  label,
  prefix,
  suffix,
  placeholder,
  disabled = false,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toFixed(precision));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update local string state when prop value changes externally
    setInputValue(value.toFixed(precision));
  }, [value, precision]);

  const clampAndFormat = (val: number) => {
    const clamped = Math.min(max, Math.max(min, val));
    return clamped;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow digits, one decimal point, and one leading minus sign
    if (/^-?\d*[.,]?\d*$/.test(val) || val === '') {
      setInputValue(val.replace(',', '.'));
    }
  };

  const handleBlur = () => {
    let parsed = parseFloat(inputValue);
    if (isNaN(parsed)) {
      parsed = clampAndFormat(0);
    } else {
      parsed = clampAndFormat(parsed);
    }
    onChange(parsed);
    setInputValue(parsed.toFixed(precision));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      stepUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      stepDown();
    } else if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const stepUp = () => {
    if (disabled) return;
    const next = clampAndFormat(value + step);
    onChange(next);
  };

  const stepDown = () => {
    if (disabled) return;
    const next = clampAndFormat(value - step);
    onChange(next);
  };

  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center group">
        {prefix && (
          <div className="absolute left-3 text-slate-400 font-bold text-xs pointer-events-none">
            {prefix}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full h-10 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 transition-all outline-none
            focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
            ${prefix ? 'pl-8' : 'pl-4'}
            ${suffix ? 'pr-14' : 'pr-10'}
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
          `}
        />
        {suffix && (
          <div className="absolute right-10 text-slate-400 font-bold text-xs pointer-events-none">
            {suffix}
          </div>
        )}
        
        {/* Stepper Buttons Container */}
        <div className="absolute right-1 inset-y-1 flex flex-col w-7 border-l border-slate-100 pl-1">
          <button
            type="button"
            onClick={stepUp}
            disabled={disabled || value >= max}
            className="flex-1 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-t-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={stepDown}
            disabled={disabled || value <= min}
            className="flex-1 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-b-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent border-t border-slate-50"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumericTextBox;
