
import React, { useMemo } from 'react';
import { PivotField, PivotMeasure } from '../types';
import Text from './Text';

interface PivotGridProps {
  data: any[];
  rows: PivotField[];
  columns: PivotField[];
  measures: PivotMeasure[];
  className?: string;
}

const PivotGrid: React.FC<PivotGridProps> = ({ data, rows, columns, measures, className = '' }) => {
  const pivotData = useMemo(() => {
    const rowKeys = new Set<string>();
    const colKeys = new Set<string>();
    const matrix: Record<string, Record<string, number>> = {};
    const rowTotals: Record<string, number> = {};
    const colTotals: Record<string, number> = {};
    let grandTotal = 0;

    data.forEach((item) => {
      const rowVal = rows.map(r => item[r.key]).join(' / ');
      const colVal = columns.map(c => item[c.key]).join(' / ');
      
      rowKeys.add(rowVal);
      colKeys.add(colVal);

      const measure = measures[0]; // Simple implementation: first measure
      const value = measure.aggregator === 'sum' ? (Number(item[measure.key]) || 0) : 1;

      if (!matrix[rowVal]) matrix[rowVal] = {};
      matrix[rowVal][colVal] = (matrix[rowVal][colVal] || 0) + value;

      rowTotals[rowVal] = (rowTotals[rowVal] || 0) + value;
      colTotals[colVal] = (colTotals[colVal] || 0) + value;
      grandTotal += value;
    });

    return {
      rows: Array.from(rowKeys).sort(),
      cols: Array.from(colKeys).sort(),
      matrix,
      rowTotals,
      colTotals,
      grandTotal
    };
  }, [data, rows, columns, measures]);

  return (
    <div className={`flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm ${className}`}>
      {/* Configuration Header */}
      <div className="bg-slate-900 px-6 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Rows</span>
            <div className="flex gap-1 mt-0.5">
              {rows.map(r => (
                <span key={r.key} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{r.label}</span>
              ))}
            </div>
          </div>
          <div className="w-[1px] h-6 bg-slate-800 self-end mb-1" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Columns</span>
            <div className="flex gap-1 mt-0.5">
              {columns.map(c => (
                <span key={c.key} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{c.label}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">Measure</span>
          <div className="text-[10px] text-white font-bold">{measures[0].aggregator.toUpperCase()}({measures[0].label})</div>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="overflow-auto custom-scrollbar max-h-[500px]">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="sticky top-0 left-0 z-30 bg-slate-50 border-b border-r border-slate-200 p-3 text-left font-black text-slate-400 uppercase tracking-tighter w-48">
                Dimensions
              </th>
              {pivotData.cols.map(col => (
                <th key={col} className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 p-3 text-center font-bold text-slate-600 min-w-[120px]">
                  {col}
                </th>
              ))}
              <th className="sticky top-0 right-0 z-20 bg-indigo-50 border-b border-l border-indigo-100 p-3 text-center font-black text-indigo-600 uppercase">
                Row Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pivotData.rows.map(row => (
              <tr key={row} className="hover:bg-slate-50/50 transition-colors group">
                <td className="sticky left-0 z-10 bg-white group-hover:bg-slate-50 border-r border-slate-200 p-3 font-bold text-slate-700">
                  {row}
                </td>
                {pivotData.cols.map(col => (
                  <td key={col} className="p-3 text-center text-slate-600 font-mono">
                    {pivotData.matrix[row]?.[col]?.toLocaleString() || '-'}
                  </td>
                ))}
                <td className="sticky right-0 z-10 bg-indigo-50/30 group-hover:bg-indigo-50 border-l border-indigo-100 p-3 text-center font-black text-indigo-700">
                  {pivotData.rowTotals[row]?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 font-black">
              <td className="sticky bottom-0 left-0 z-30 bg-slate-100 border-t border-r border-slate-200 p-3 text-slate-800 uppercase tracking-tighter">
                Column Totals
              </td>
              {pivotData.cols.map(col => (
                <td key={col} className="sticky bottom-0 z-20 bg-slate-100 border-t border-slate-200 p-3 text-center text-slate-800 font-mono">
                  {pivotData.colTotals[col]?.toLocaleString()}
                </td>
              ))}
              <td className="sticky bottom-0 right-0 z-30 bg-indigo-600 text-white p-3 text-center font-black border-t border-indigo-700">
                {pivotData.grandTotal.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PivotGrid;
