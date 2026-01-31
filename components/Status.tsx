
import React from 'react';
import { StatusType } from '../types';

interface StatusProps {
  type: StatusType;
  label: string;
}

const Status: React.FC<StatusProps> = ({ type, label }) => {
  const styles = {
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    error: 'bg-rose-100 text-rose-800 border-rose-200',
    info: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    neutral: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  const dots = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-indigo-500',
    neutral: 'bg-slate-500',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dots[type]}`} />
      {label}
    </span>
  );
};

export default Status;
