
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface PieChartData {
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
  className?: string;
  innerRadius?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 300,
  className = '',
  innerRadius = 0,
}) => {
  const margin = 20;
  const radius = (size - margin * 2) / 2;

  const { arcs, colorScale } = useMemo(() => {
    const pieGenerator = d3.pie<PieChartData>()
      .value(d => d.value)
      .sort(null);

    const arcs = pieGenerator(data);

    const defaultColors = d3.schemeTableau10;
    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.label))
      .range(data.map((d, i) => d.color || defaultColors[i % defaultColors.length]));

    return { arcs, colorScale };
  }, [data]);

  const arcGenerator = d3.arc<d3.PieArcDatum<PieChartData>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(4)
    .padAngle(0.02);

  const labelArcGenerator = d3.arc<d3.PieArcDatum<PieChartData>>()
    .innerRadius(radius * 0.6)
    .outerRadius(radius * 0.6);

  const totalValue = d3.sum(data, (d: PieChartData) => d.value);

  return (
    <div className={`flex flex-col md:flex-row items-center justify-center gap-8 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            {arcs.map((arc, i) => (
              <g key={i} className="group cursor-pointer">
                <path
                  d={arcGenerator(arc) || ''}
                  fill={colorScale(arc.data.label)}
                  className="transition-all duration-300 hover:opacity-80 group-hover:scale-105 transform origin-center"
                />
                {/* Percentage label inside the slice if it's large enough */}
                {arc.endAngle - arc.startAngle > 0.3 && (
                  <text
                    transform={`translate(${labelArcGenerator.centroid(arc)})`}
                    textAnchor="middle"
                    dy=".35em"
                    className="text-[10px] font-bold fill-white pointer-events-none"
                  >
                    {Math.round((arc.data.value / totalValue) * 100)}%
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colorScale(d.label) }} 
            />
            <span className="text-sm font-semibold text-slate-600">{d.label}</span>
            <span className="text-sm font-mono text-slate-400">({d.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
