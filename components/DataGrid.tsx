
import React, { useState, useMemo } from 'react';
import { DataGridColumn } from '../types';
import Button from './Button';
import Text from './Text';

interface DataGridProps {
  columns: DataGridColumn[];
  data: any[];
  rowsPerPage?: number;
  className?: string;
  onRowClick?: (item: any) => void;
}

const DataGrid: React.FC<DataGridProps> = ({
  columns,
  data,
  rowsPerPage = 10,
  className = '',
  onRowClick,
}) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 排序邏輯
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // 分頁邏輯
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={`flex flex-col border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden ${className}`}>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && requestSort(col.key)}
                  className={`
                    px-6 py-4 font-black text-slate-400 uppercase tracking-widest text-[10px] text-left select-none
                    ${col.sortable ? 'cursor-pointer hover:text-indigo-600 hover:bg-slate-100 transition-colors' : ''}
                    ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''}
                  `}
                >
                  <div className={`flex items-center gap-2 ${col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : ''}`}>
                    {col.header}
                    {col.sortable && (
                      <span className="w-3 h-3 text-slate-300">
                        {sortConfig?.key === col.key ? (
                          sortConfig.direction === 'asc' ? '↑' : '↓'
                        ) : '⇅'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentData.map((row, idx) => (
              <tr 
                key={row.id || idx}
                onClick={() => onRowClick?.(row)}
                className={`
                  transition-colors group
                  ${idx % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'}
                  ${onRowClick ? 'cursor-pointer hover:bg-indigo-50/50' : 'hover:bg-slate-50'}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`
                      px-6 py-3.5 text-slate-600 font-medium
                      ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''}
                    `}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grid Footer / Pagination */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} records
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className="text-xs font-black text-slate-700 mx-2">
            {currentPage} <span className="text-slate-300 font-normal">/</span> {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
