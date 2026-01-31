
import React from 'react';

interface SegmentOption {
  label: string;
  value: string;
}

interface SegmentProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /* Adding optional children for consistency with React.FC prop expectations */
  children?: React.ReactNode;
}

const Segment: React.FC<SegmentProps> = ({ options, value, onChange, className = '' }) => {
  return (
    <div className={`inline-flex p-1 bg-slate-100 rounded-xl ${className}`}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              isActive 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default Segment;
