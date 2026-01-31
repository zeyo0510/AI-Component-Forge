
import React from 'react';

interface TableProps {
  data: Array<Record<string, any>>;
  headers: string[];
}

const Table: React.FC<TableProps> = ({ data, headers }) => {
  return (
    <div className="w-full border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 font-bold tracking-widest">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-6 py-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50 transition-colors">
              {headers.map(h => (
                <td key={`${idx}-${h}`} className="px-6 py-4 text-slate-600 whitespace-nowrap">
                  {row[h.toLowerCase()] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
