
import React from 'react';
import { TabItem } from '../types';

interface TabProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  variant?: 'pills' | 'underline';
}

const Tab: React.FC<TabProps> = ({ tabs, activeTab, onTabChange, variant = 'underline' }) => {
  return (
    <div className="flex space-x-1 border-b border-slate-200">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        if (variant === 'pills') {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center">
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </div>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all relative -mb-[2px] ${
              isActive 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center">
              {tab.icon && <span className={`mr-2 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>{tab.icon}</span>}
              {tab.label}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Tab;
