
import React from 'react';
import Text from './Text';

interface FormControlProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormControl: React.FC<FormControlProps> = ({
  label,
  description,
  error,
  required,
  children,
  className = '',
}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {(label || required) && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-700 tracking-tight flex items-center">
            {label}
            {required && <span className="ml-1 text-rose-500 font-black">*</span>}
          </label>
        </div>
      )}
      
      <div className="relative">
        {children}
      </div>

      {(description || error) && (
        <div className="flex flex-col space-y-1">
          {description && !error && (
            <Text variant="small" className="text-[11px] leading-tight text-slate-400">
              {description}
            </Text>
          )}
          {error && (
            <div className="flex items-center space-x-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <svg className="w-3.5 h-3.5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-[11px] font-bold text-rose-500">
                {error}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormControl;
