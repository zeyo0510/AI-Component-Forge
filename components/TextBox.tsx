
import React from 'react';

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  helperText,
  error,
  multiline = false,
  rows = 3,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `textbox-${Math.random().toString(36).substr(2, 9)}`;
  const baseClasses = `w-full px-4 py-2.5 bg-white border rounded-lg text-sm transition-all outline-none focus:ring-4 focus:ring-indigo-50/50 ${
    error 
      ? 'border-rose-300 focus:border-rose-500 text-rose-900' 
      : 'border-slate-200 focus:border-indigo-500 text-slate-700'
  } ${className}`;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      
      {multiline ? (
        <textarea
          id={inputId}
          rows={rows}
          className={baseClasses}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={inputId}
          className={baseClasses}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {(helperText || error) && (
        <p className={`text-xs ${error ? 'text-rose-500 font-medium' : 'text-slate-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default TextBox;
