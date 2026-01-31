
import React, { useState } from 'react';
import { TreeListDataItem, TreeListColumn } from '../types';

interface TreeListProps {
  data: TreeListDataItem[];
  columns: TreeListColumn[];
  indentSize?: number;
  className?: string;
}

const TreeListRow: React.FC<{
  item: TreeListDataItem;
  columns: TreeListColumn[];
  depth: number;
  indentSize: number;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
}> = ({ item, columns, depth, indentSize, expandedIds, toggleExpand }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedIds.has(item.id);

  return (
    <>
      <tr className="hover:bg-slate-50 transition-colors group">
        {columns.map((col, idx) => {
          const isFirstColumn = idx === 0;
          return (
            <td
              key={col.key}
              style={{ width: col.width }}
              className={`px-6 py-4 whitespace-nowrap text-sm text-slate-600 border-b border-slate-100 ${
                col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
              }`}
            >
              <div className="flex items-center">
                {isFirstColumn && (
                  <>
                    <div style={{ width: `${depth * indentSize}px` }} className="flex-shrink-0" />
                    <div className="w-6 h-6 flex items-center justify-center mr-1">
                      {hasChildren ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(item.id);
                          }}
                          className={`p-1 rounded hover:bg-indigo-50 text-indigo-400 transition-all ${
                            isExpanded ? 'rotate-90 text-indigo-600' : ''
                          }`}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 ml-1.5" />
                      )}
                    </div>
                  </>
                )}
                <div className={`${isFirstColumn ? 'font-bold text-slate-800' : ''}`}>
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </div>
              </div>
            </td>
          );
        })}
      </tr>
      {isExpanded && hasChildren && item.children!.map((child) => (
        <TreeListRow
          key={child.id}
          item={child}
          columns={columns}
          depth={depth + 1}
          indentSize={indentSize}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
        />
      ))}
    </>
  );
};

const TreeList: React.FC<TreeListProps> = ({ data, columns, indentSize = 24, className = '' }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIds(newSet);
  };

  return (
    <div className={`overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm ${className}`}>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest ${
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((item) => (
              <TreeListRow
                key={item.id}
                item={item}
                columns={columns}
                depth={0}
                indentSize={indentSize}
                expandedIds={expandedIds}
                toggleExpand={toggleExpand}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreeList;
