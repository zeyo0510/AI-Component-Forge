
import React, { useState, useEffect } from 'react';

interface MaskedTextBoxProps {
  mask: string; // e.g., "(999) 999-9999" where 9 is a digit, A is a letter, * is any
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const MaskedTextBox: React.FC<MaskedTextBoxProps> = ({
  mask,
  value = '',
  onChange,
  label,
  placeholder,
  error,
  disabled = false,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState('');

  const formatValue = (val: string) => {
    let formatted = '';
    let rawIndex = 0;
    const raw = val.replace(/[^a-zA-Z0-9]/g, '');

    for (let i = 0; i < mask.length && rawIndex < raw.length; i++) {
      const maskChar = mask[i];
      const rawChar = raw[rawIndex];

      if (maskChar === '9') {
        if (/[0-9]/.test(rawChar)) {
          formatted += rawChar;
          rawIndex++;
        } else {
          break;
        }
      } else if (maskChar === 'A') {
        if (/[a-zA-Z]/.test(rawChar)) {
          formatted += rawChar;
          rawIndex++;
        } else {
          break;
        }
      } else if (maskChar === '*') {
        formatted += rawChar;
        rawIndex++;
      } else {
        formatted += maskChar;
        if (rawChar === maskChar) {
          rawIndex++;
        }
      }
    }
    return formatted;
  };

  useEffect(() => {
    setDisplayValue(formatValue(value));
  }, [value, mask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatValue(input);
    setDisplayValue(formatted);
    
    if (onChange) {
      // Return the raw value (only alphanumeric)
      onChange(formatted.replace(/[^a-zA-Z0-9]/g, ''));
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder || mask.replace(/[9A*]/g, '_')}
          className={`
            w-full px-4 py-3 rounded-xl border-2 font-mono text-sm transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-indigo-500/10
            ${disabled ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed' : 
              error ? 'border-rose-500 bg-rose-50 text-rose-600 focus:border-rose-500' : 
              'border-slate-200 bg-white text-slate-900 focus:border-indigo-600 group-hover:border-slate-300'}
          `}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within:opacity-40 transition-opacity">
          <span className="text-[10px] font-black tracking-tighter text-slate-400 uppercase">{mask}</span>
        </div>
      </div>
      {error && (
        <span className="text-[10px] font-bold text-rose-500 px-1 uppercase tracking-tight">
          {error}
        </span>
      )}
    </div>
  );
};

export default MaskedTextBox;
