
import React from 'react';
import Status from './Status';

interface NodeProps {
  title: string;
  type?: 'logic' | 'input' | 'output';
  status?: 'success' | 'warning' | 'error' | 'info';
  children?: React.ReactNode;
}

const Node: React.FC<NodeProps> = ({ title, type = 'logic', status = 'info', children }) => {
  return (
    <div className="w-56 bg-white border border-slate-200 rounded-xl shadow-md relative overflow-hidden">
      <div className={`h-1.5 w-full ${
        status === 'success' ? 'bg-emerald-500' : 
        status === 'warning' ? 'bg-amber-500' : 
        status === 'error' ? 'bg-rose-500' : 'bg-indigo-500'
      }`} />
      
      {/* Input Port */}
      {(type === 'logic' || type === 'output') && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-slate-400 rounded-full border-2 border-white" />
      )}
      
      {/* Output Port */}
      {(type === 'logic' || type === 'input') && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-slate-400 rounded-full border-2 border-white" />
      )}

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{type}</span>
          <Status type={status} label="" />
        </div>
        <h4 className="text-sm font-bold text-slate-800 mb-1">{title}</h4>
        <div className="text-[10px] text-slate-500">
          {children || "Processing node logic sequence..."}
        </div>
      </div>
    </div>
  );
};

export default Node;
