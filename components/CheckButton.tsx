
import React from 'react';

interface CheckButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
}

const CheckButton: React.FC<CheckButtonProps> = ({ checked, onChange, label, id }) => {
  return (
    <label htmlFor={id} className="inline-flex items-center group cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`w-6 h-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
          checked ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-slate-400'
        }`}>
          {checked && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
      </div>
      <span className="ml-3 text-sm font-medium text-slate-700 group-hover:text-slate-900">{label}</span>
    </label>
  );
};

export default CheckButton;
