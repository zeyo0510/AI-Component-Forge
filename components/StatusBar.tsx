
import React from 'react';

interface StatusBarProps {
  status: string;
  items: { label: string; value: string; icon?: React.ReactNode }[];
}

const StatusBar: React.FC<StatusBarProps> = ({ status, items }) => {
  return (
    <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs font-medium fixed bottom-0 left-0 right-0 z-[100] shadow-xl">
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-indigo-400 uppercase tracking-tighter">
          <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
          {status}
        </div>
        <div className="h-4 w-[1px] bg-slate-700"></div>
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center text-slate-400">
            {item.icon && <span className="mr-1.5">{item.icon}</span>}
            <span className="mr-1">{item.label}:</span>
            <span className="text-slate-200">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-slate-500">UTF-8</span>
        <span className="text-slate-500">React v19.2.3</span>
      </div>
    </div>
  );
};

export default StatusBar;
