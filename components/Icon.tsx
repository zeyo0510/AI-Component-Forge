
import React from 'react';

const icons = [
  { name: 'Home', svg: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
  { name: 'Settings', svg: <><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></> },
  { name: 'User', svg: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
  { name: 'Bell', svg: <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> },
  { name: 'Search', svg: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> },
  { name: 'Check', svg: <path d="M5 13l4 4L19 7" /> },
  { name: 'Mail', svg: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
  { name: 'Clock', svg: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
];

const Icon: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {icons.map(icon => (
        <div key={icon.name} className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all group">
          <svg className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon.svg}
          </svg>
          <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 uppercase tracking-widest">{icon.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Icon;
