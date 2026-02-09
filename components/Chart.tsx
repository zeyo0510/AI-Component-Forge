
import React from 'react';

interface ChartDataPoint {
  label: string;
  value: number;
  color: string;
}

interface ChartProps {
  type: 'pie' | 'line';
  data: ChartDataPoint[];
  /* Optional children to satisfy strict TypeScript requirements for self-closing tags */
  children?: React.ReactNode;
}

const Chart = ({ type, data, children }: ChartProps) => {
  if (type === 'pie') {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let cumulativeAngle = 0;

    return (
      <div className="flex flex-col md:flex-row items-center justify-around gap-8 p-4">
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {data.map((item, i) => {
              const angle = (item.value / total) * 360;
              const x1 = 50 + 40 * Math.cos((cumulativeAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((cumulativeAngle * Math.PI) / 180);
              cumulativeAngle += angle;
              const x2 = 50 + 40 * Math.cos((cumulativeAngle * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((cumulativeAngle * Math.PI) / 180);
              const largeArc = angle > 180 ? 1 : 0;

              return (
                <path
                  key={i}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={item.color}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
              );
            })}
            <circle cx="50" cy="50" r="25" fill="white" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Total</span>
            <span className="text-2xl font-black text-slate-800 tracking-tighter">{total}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-semibold text-slate-600">{item.label}</span>
              <span className="text-sm font-mono text-slate-400">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Line Chart Implementation
  const max = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.value / max) * 80;
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `0,100 ${points} 100,100`;

  return (
    <div className="w-full h-[250px] p-4 relative">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* Horizontal Grids */}
        {[0, 25, 50, 75, 100].map(v => (
          <line key={v} x1="0" y1={v} x2="100" y2={v} className="stroke-slate-100" strokeWidth="0.5" />
        ))}
        
        {/* Area Fill */}
        <polyline points={areaPath} className="fill-indigo-50/50" />
        
        {/* Line */}
        <polyline 
          points={points} 
          fill="none" 
          className="stroke-indigo-600 stroke-[2]" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Dots */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - (d.value / max) * 80;
          return (
            <circle 
              key={i} 
              cx={x} 
              cy={y} 
              r="1.5" 
              className="fill-white stroke-indigo-600 stroke-[1] hover:r-[3] transition-all cursor-crosshair" 
            />
          );
        })}
      </svg>
      <div className="flex justify-between mt-4">
        {data.map((d, i) => (
          <span key={i} className="text-[10px] font-bold text-slate-400 uppercase">{d.label}</span>
        ))}
      </div>
    </div>
  );
};

export default Chart;
