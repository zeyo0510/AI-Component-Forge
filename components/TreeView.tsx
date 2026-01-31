
import React, { useState } from 'react';
import { TreeItem } from '../types';

interface TreeViewProps {
  items: TreeItem[];
  level?: number;
}

const TreeViewNode: React.FC<{ item: TreeItem; level: number }> = ({ item, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={`flex items-center py-1.5 px-2 rounded-lg cursor-pointer transition-colors duration-150 group hover:bg-slate-100`}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-5 h-5 flex items-center justify-center mr-1">
          {hasChildren && (
            <svg
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
        <div className="flex items-center">
          {item.icon && <span className="mr-2 text-slate-500">{item.icon}</span>}
          <span className={`text-sm font-medium ${isExpanded ? 'text-indigo-600' : 'text-slate-700'}`}>
            {item.label}
          </span>
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="animate-in slide-in-from-top-1 duration-200">
          <TreeView items={item.children!} level={level + 1} />
        </div>
      )}
    </div>
  );
};

const TreeView: React.FC<TreeViewProps> = ({ items, level = 0 }) => {
  return (
    <div className="space-y-0.5">
      {items.map((item) => (
        <TreeViewNode key={item.id} item={item} level={level} />
      ))}
    </div>
  );
};

export default TreeView;
