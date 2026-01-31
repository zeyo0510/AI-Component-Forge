
import React from 'react';
import { ListItem } from '../types';

interface ListViewProps {
  items: ListItem[];
  onItemClick?: (item: ListItem) => void;
}

const ListView: React.FC<ListViewProps> = ({ items, onItemClick }) => {
  return (
    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick?.(item)}
          className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group`}
        >
          <div className="flex items-center space-x-4">
            {item.icon && (
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                {item.icon}
              </div>
            )}
            <div>
              <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
              {item.description && <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>}
            </div>
          </div>
          {item.metadata && (
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
              {item.metadata}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListView;
