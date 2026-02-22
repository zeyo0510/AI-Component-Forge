
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface DonutChartData {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  size?: number;
  className?: string;
  thickness?: number; // How thick the ring is
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 300,
  className = '',
  thickness = 60,
}) => {
  const margin = 20;
  const outerRadius = (size - margin * 2) / 2;
  const innerRadius = outerRadius - thickness;

  const { arcs, colorScale, totalValue } = useMemo(() => {
    const pieGenerator = d3.pie<DonutChartData>()
      .value(d => d.value)
      .sort(null);

    const arcs = pieGenerator(data);
    const totalValue = d3.sum(data, (d: DonutChartData) => d.value);

    const defaultColors = d3.schemeTableau10;
    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.label))
      .range(data.map((d, i) => d.color || defaultColors[i % defaultColors.length]));

    return { arcs, colorScale, totalValue };
  }, [data]);

  const arcGenerator = d3.arc<d3.PieArcDatum<DonutChartData>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(8)
    .padAngle(0.03);

  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            {arcs.map((arc, i) => (
              <g key={i} className="group cursor-pointer">
                <path
                  d={arcGenerator(arc) || ''}
                  fill={colorScale(arc.data.label)}
                  className="transition-all duration-300 hover:opacity-90 group-hover:scale-105 transform origin-center"
                />
              </g>
            ))}
          </g>
        </svg>
        
        {/* Center Content */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ padding: thickness }}
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</span>
          <span className="text-2xl font-black text-slate-800 font-mono">{totalValue}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: colorScale(d.label) }} 
            />
            <span className="text-xs font-bold text-slate-600 truncate max-w-[100px]">{d.label}</span>
            <span className="text-xs font-mono text-slate-400">
              {Math.round((d.value / totalValue) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
