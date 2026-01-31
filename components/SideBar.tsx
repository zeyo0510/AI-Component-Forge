
import React from 'react';

interface SideBarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SideBarProps {
  items: SideBarItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ items, activeId, onSelect }) => {
  return (
    <div className="w-64 border-r border-slate-100 flex flex-col h-full bg-slate-50/30">
      <div className="p-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              activeId === item.id 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className={`mr-3 ${activeId === item.id ? 'text-indigo-600' : 'text-slate-400'}`}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
