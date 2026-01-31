
import React from 'react';
import { RadioOption } from '../types';

interface RadioButtonProps {
  options: RadioOption[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ options, name, value, onChange, label }) => {
  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-semibold text-slate-700 block mb-2">{label}</label>}
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
              value === option.value
                ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${
              value === option.value ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'
            }`}>
              {value === option.value && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className={`text-sm font-medium ${value === option.value ? 'text-indigo-900' : 'text-slate-700'}`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
