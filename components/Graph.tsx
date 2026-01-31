
import React from 'react';
import { GraphDataPoint } from '../types';

interface GraphProps {
  data: GraphDataPoint[];
  height?: number;
}

const Graph: React.FC<GraphProps> = ({ data, height = 240 }) => {
  // 防止空數據或全為 0 的情況
  const validData = data.length > 0 ? data : [];
  const maxValue = Math.max(...validData.map(d => d.value), 0) || 100;
  
  // 生成背景參考線
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="w-full relative pt-8 pb-2">
      {/* 背景參考線 */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-1" style={{ height: `${height}px`, top: '32px' }}>
        {gridLines.reverse().map((line, i) => (
          <div key={i} className="w-full border-t border-slate-100 flex justify-between items-start">
            <span className="text-[9px] font-bold text-slate-300 -mt-2 bg-white px-1">
              {Math.round(maxValue * line)}
            </span>
          </div>
        ))}
      </div>

      {/* 長條圖主體 */}
      <div className="flex items-end space-x-2 md:space-x-4 w-full relative z-10" style={{ height: `${height}px` }}>
        {validData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center italic text-slate-300 text-sm">
            No data available
          </div>
        ) : (
          validData.map((point, i) => {
            const barHeight = (point.value / maxValue) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                {/* 條形容器 */}
                <div 
                  className={`w-full rounded-t-xl transition-all duration-700 ease-out relative shadow-sm group-hover:shadow-md group-hover:-translate-y-1 ${
                    point.color || 'bg-gradient-to-t from-indigo-600 to-indigo-400'
                  }`}
                  style={{ height: `${barHeight}%` }}
                >
                  {/* 反光效果 */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 rounded-t-xl pointer-events-none" />
                  
                  {/* 進階 Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110 pointer-events-none z-20 shadow-xl whitespace-nowrap">
                    <div className="font-black mb-0.5">{point.value}</div>
                    <div className="text-[8px] text-slate-400 uppercase tracking-tighter">{point.label}</div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                  </div>
                </div>

                {/* 底部標籤 */}
                <div className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter truncate w-full text-center group-hover:text-indigo-600 transition-colors">
                  {point.label}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Graph;
