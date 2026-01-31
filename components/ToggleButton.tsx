
import React from 'react';

interface ToggleButtonProps {
  enabled: boolean;
  setEnabled: (val: boolean) => void;
  label?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ enabled, setEnabled, label }) => {
  return (
    <div className="flex items-center space-x-3">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <button
        onClick={() => setEnabled(!enabled)}
        className={`${
          enabled ? 'bg-indigo-600' : 'bg-slate-300'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
      >
        <span
          className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
};

export default ToggleButton;
