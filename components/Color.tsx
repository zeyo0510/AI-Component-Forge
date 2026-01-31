
import React, { useState } from 'react';

interface ColorProps {
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
}

const Color: React.FC<ColorProps> = ({ value, onChange, presets = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#334155'] }) => {
  return (
    <div className="space-y-4 max-w-xs">
      <div className="flex items-center space-x-4 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div 
          className="w-12 h-12 rounded-lg shadow-inner flex-shrink-0"
          style={{ backgroundColor: value }}
        />
        <div className="flex-1">
          <input 
            type="text" 
            value={value.toUpperCase()} 
            onChange={(e) => onChange(e.target.value)}
            className="w-full font-mono text-sm border-none outline-none p-0 text-slate-700 font-bold"
          />
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active HEX</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map(p => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 rounded-lg transition-transform hover:scale-110 active:scale-95 border-2 ${value === p ? 'border-indigo-600 scale-110 ring-2 ring-indigo-100' : 'border-white shadow-sm'}`}
            style={{ backgroundColor: p }}
          />
        ))}
        <label className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors border border-slate-200 overflow-hidden relative">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <input 
            type="color" 
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default Color;
