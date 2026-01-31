
import React, { useState } from 'react';
import { RibbonTabItem } from '../types';
import Text from './Text';

interface RibbonMenuProps {
  tabs: RibbonTabItem[];
  className?: string;
}

const RibbonMenu: React.FC<RibbonMenuProps> = ({ tabs, className = '' }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const activeTab = tabs.find((t) => t.id === activeTabId);

  return (
    <div className={`flex flex-col bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Tabs Header */}
      <div className="flex bg-slate-50 border-b border-slate-200 px-2 pt-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`
              px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-t-lg border-x border-t
              ${activeTabId === tab.id
                ? 'bg-white border-slate-200 text-indigo-600 -mb-[1px] relative z-10'
                : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ribbon Content Body */}
      <div className="flex items-stretch h-28 bg-white p-2 overflow-x-auto custom-scrollbar">
        {activeTab?.groups.map((group, gIdx) => (
          <div key={gIdx} className="flex items-stretch">
            {/* Group Separator */}
            {gIdx > 0 && <div className="w-[1px] bg-slate-100 mx-2 self-center h-20" />}
            
            <div className="flex flex-col">
              {/* Group Items Container */}
              <div className="flex-1 flex items-center gap-1 px-2">
                {group.items.map((item, iIdx) => (
                  <button
                    key={iIdx}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`
                      flex flex-col items-center justify-center rounded-lg transition-all
                      ${item.disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-indigo-50 hover:text-indigo-600'}
                      ${item.size === 'large' ? 'w-20 h-20 p-1' : 'w-16 h-12 p-1'}
                    `}
                  >
                    <div className={`${item.size === 'large' ? 'text-2xl mb-1' : 'text-lg'}`}>
                      {item.icon}
                    </div>
                    <span className={`text-center font-bold tracking-tight leading-tight ${item.size === 'large' ? 'text-[10px]' : 'text-[9px]'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Group Label */}
              <div className="text-center mt-auto">
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  {group.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RibbonMenu;
