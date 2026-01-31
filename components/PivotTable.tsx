
import React, { useState, useMemo } from 'react';
import Text from './Text';
import Status from './Status';

interface PivotTableProps {
  data: any[];
  rowFields: string[];
  columnFields: string[];
  measureField: string;
  aggregator?: 'sum' | 'count' | 'avg';
  className?: string;
}

interface HierarchyNode {
  id: string;
  label: string;
  children: Record<string, HierarchyNode>;
  values: Record<string, number>; // key is column path string
  total: number;
}

const PivotTable: React.FC<PivotTableProps> = ({
  data,
  rowFields,
  columnFields,
  measureField,
  aggregator = 'sum',
  className = '',
}) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const toggleExpand = (key: string) => {
    const newSet = new Set(expandedKeys);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setExpandedKeys(newSet);
  };

  // 處理透視數據邏輯
  const pivotResult = useMemo(() => {
    const root: HierarchyNode = { id: 'root', label: 'Total', children: {}, values: {}, total: 0 };
    const allColPaths = new Set<string>();

    data.forEach((item) => {
      const colPath = columnFields.map(f => item[f]).join(' / ');
      allColPaths.add(colPath);

      let val = Number(item[measureField]) || 0;
      
      // 更新行階層
      let currentNode = root;
      currentNode.total += (aggregator === 'count' ? 1 : val);
      if (!currentNode.values[colPath]) currentNode.values[colPath] = 0;
      currentNode.values[colPath] += (aggregator === 'count' ? 1 : val);

      rowFields.forEach((field, idx) => {
        const label = String(item[field]);
        const pathId = rowFields.slice(0, idx + 1).map(f => item[f]).join('|');
        
        if (!currentNode.children[label]) {
          currentNode.children[label] = { 
            id: pathId, 
            label, 
            children: {}, 
            values: {}, 
            total: 0 
          };
        }
        
        currentNode = currentNode.children[label];
        currentNode.total += (aggregator === 'count' ? 1 : val);
        if (!currentNode.values[colPath]) currentNode.values[colPath] = 0;
        currentNode.values[colPath] += (aggregator === 'count' ? 1 : val);
      });
    });

    return {
      root,
      uniqueCols: Array.from(allColPaths).sort()
    };
  }, [data, rowFields, columnFields, measureField, aggregator]);

  const renderRows = (node: HierarchyNode, depth: number = 0): React.ReactNode[] => {
    const rows: React.ReactNode[] = [];
    const isExpanded = expandedKeys.has(node.id) || depth === 0;
    const hasChildren = Object.keys(node.children).length > 0;

    // 如果不是 root，則渲染當前行
    if (node.id !== 'root') {
      rows.push(
        <tr key={node.id} className="group transition-colors hover:bg-indigo-50/30">
          <td 
            className="sticky left-0 z-10 bg-white group-hover:bg-indigo-50/30 border-r border-slate-200 p-3 whitespace-nowrap text-sm font-medium text-slate-700"
            style={{ paddingLeft: `${depth * 20 + 12}px` }}
          >
            <div className="flex items-center gap-2">
              {hasChildren ? (
                <button 
                  onClick={() => toggleExpand(node.id)}
                  className={`w-5 h-5 flex items-center justify-center rounded border transition-all ${expandedKeys.has(node.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-100 border-slate-200 text-slate-400'}`}
                >
                  <span className="text-xs font-bold leading-none">{expandedKeys.has(node.id) ? '−' : '+'}</span>
                </button>
              ) : (
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                </div>
              )}
              {node.label}
            </div>
          </td>
          {pivotResult.uniqueCols.map(col => (
            <td key={col} className="p-3 text-center text-sm text-slate-600 font-mono border-b border-slate-100">
              {node.values[col]?.toLocaleString() || '0'}
            </td>
          ))}
          <td className="p-3 text-center text-sm font-black text-indigo-600 border-b border-l border-indigo-50 bg-indigo-50/10">
            {node.total.toLocaleString()}
          </td>
        </tr>
      );
    }

    // 遞歸渲染子行
    if (isExpanded || node.id === 'root') {
      Object.values(node.children).forEach(child => {
        rows.push(...renderRows(child, depth + 1));
      });
    }

    return rows;
  };

  return (
    <div className={`flex flex-col border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-xl ${className}`}>
      {/* 工具列 */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <Text variant="caption" className="text-slate-500 mb-1">Dimensions</Text>
            <div className="flex gap-2">
              {rowFields.map(f => <span key={f} className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30 font-bold uppercase">{f}</span>)}
            </div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="flex flex-col">
            <Text variant="caption" className="text-slate-500 mb-1">Analysis Mode</Text>
            <div className="flex items-center gap-2">
               <Status type="success" label={aggregator.toUpperCase()} />
               <span className="text-xs text-slate-400 font-bold uppercase">{measureField}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setExpandedKeys(new Set())} className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-all">Collapse All</button>
        </div>
      </div>

      {/* 表格主體 */}
      <div className="overflow-auto custom-scrollbar max-h-[600px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="sticky top-0 z-30">
              <th className="left-0 z-40 bg-slate-50 border-b border-r border-slate-200 p-4 text-left font-black text-[10px] text-slate-400 uppercase tracking-widest w-64 min-w-[200px]">
                Hierarchy
              </th>
              {pivotResult.uniqueCols.map(col => (
                <th key={col} className="bg-slate-50 border-b border-slate-200 p-4 text-center font-black text-[10px] text-slate-500 uppercase tracking-widest min-w-[120px]">
                  {col}
                </th>
              ))}
              <th className="right-0 z-40 bg-indigo-600 border-b border-l border-indigo-700 p-4 text-center font-black text-[10px] text-white uppercase tracking-widest">
                Grand Total
              </th>
            </tr>
          </thead>
          <tbody>
            {renderRows(pivotResult.root)}
          </tbody>
          <tfoot>
            <tr className="bg-slate-900 text-white font-black">
              <td className="sticky left-0 z-10 bg-slate-900 border-r border-slate-800 p-4 text-sm uppercase tracking-tighter">Grand Total</td>
              {pivotResult.uniqueCols.map(col => (
                <td key={col} className="p-4 text-center text-sm font-mono text-indigo-400">
                  {pivotResult.root.values[col]?.toLocaleString() || '0'}
                </td>
              ))}
              <td className="p-4 text-center text-lg font-black text-indigo-500 bg-indigo-500/10">
                {pivotResult.root.total.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PivotTable;
