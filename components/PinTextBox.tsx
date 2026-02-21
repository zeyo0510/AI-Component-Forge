
import React, { useState, useRef, useEffect } from 'react';

interface PinTextBoxProps {
  length?: number;
  onComplete?: (pin: string) => void;
  onChange?: (pin: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  mask?: boolean;
  className?: string;
}

const PinTextBox: React.FC<PinTextBoxProps> = ({
  length = 6,
  onComplete,
  onChange,
  label,
  error,
  disabled = false,
  mask = false,
  className = '',
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current = inputs.current.slice(0, length);
  }, [length]);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;
    
    // Only allow numbers
    const sanitizedValue = value.replace(/[^0-9]/g, '').slice(-1);
    
    const newValues = [...values];
    newValues[index] = sanitizedValue;
    setValues(newValues);

    const pin = newValues.join('');
    if (onChange) onChange(pin);

    // Auto focus next
    if (sanitizedValue && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (pin.length === length && onComplete) {
      onComplete(pin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length);
    
    const newValues = [...values];
    pastedData.split('').forEach((char, i) => {
      if (i < length) newValues[i] = char;
    });
    
    setValues(newValues);
    const pin = newValues.join('');
    if (onChange) onChange(pin);
    if (pin.length === length && onComplete) onComplete(pin);
    
    // Focus the next empty or the last one
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputs.current[nextIndex]?.focus();
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
          {label}
        </label>
      )}
      
      <div className="flex gap-2" onPaste={handlePaste}>
        {values.map((val, i) => (
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            type={mask ? 'password' : 'text'}
            inputMode="numeric"
            maxLength={1}
            value={val}
            disabled={disabled}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`
              w-12 h-14 text-center text-xl font-black rounded-xl border-2 transition-all duration-200
              focus:outline-none focus:ring-4 focus:ring-indigo-500/10
              ${disabled ? 'bg-slate-50 border-slate-100 text-slate-300' : 
                error ? 'border-rose-500 bg-rose-50 text-rose-600 focus:border-rose-500' : 
                'border-slate-200 bg-white text-slate-900 focus:border-indigo-600'}
            `}
          />
        ))}
      </div>

      {error && (
        <span className="text-[10px] font-bold text-rose-500 px-1 uppercase tracking-tight">
          {error}
        </span>
      )}
    </div>
  );
};

export default PinTextBox;
