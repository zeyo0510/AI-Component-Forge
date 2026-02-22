
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface PolarData {
  axis: string;
  value: number;
}

interface PolarPlotProps {
  data: PolarData[];
  size?: number;
  className?: string;
  color?: string;
  maxValue?: number;
}

const PolarPlot: React.FC<PolarPlotProps> = ({
  data,
  size = 400,
  className = '',
  color = '#6366f1',
  maxValue,
}) => {
  const margin = 50;
  const radius = (size - margin * 2) / 2;
  const angleSlice = (Math.PI * 2) / data.length;

  const { axes, polygonPoints, gridLevels } = useMemo(() => {
    const maxVal = maxValue || (d3.max(data, (d: PolarData) => d.value) as number) || 100;
    
    const rScale = d3.scaleLinear()
      .domain([0, maxVal])
      .range([0, radius]);

    // Grid levels (circles)
    const gridLevels = [0.2, 0.4, 0.6, 0.8, 1].map(d => rScale(maxVal * d));

    // Axis lines and labels
    const axes = data.map((d, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      return {
        label: d.axis,
        x1: 0,
        y1: 0,
        x2: radius * Math.cos(angle),
        y2: radius * Math.sin(angle),
        labelX: (radius + 20) * Math.cos(angle),
        labelY: (radius + 20) * Math.sin(angle),
      };
    });

    // Data polygon points
    const points = data.map((d, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const r = rScale(d.value);
      return [r * Math.cos(angle), r * Math.sin(angle)];
    });

    const polygonPoints = points.map(p => p.join(',')).join(' ');

    return { axes, polygonPoints, gridLevels };
  }, [data, radius, angleSlice, maxValue]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          {/* Grid Circles */}
          {gridLevels.map((r, i) => (
            <circle
              key={i}
              r={r}
              fill="none"
              className="stroke-slate-100"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          {axes.map((axis, i) => (
            <g key={i}>
              <line
                x1={axis.x1}
                y1={axis.y1}
                x2={axis.x2}
                y2={axis.y2}
                className="stroke-slate-200"
                strokeWidth="1"
              />
              <text
                x={axis.labelX}
                y={axis.labelY}
                textAnchor="middle"
                dy=".35em"
                className="text-[10px] font-bold fill-slate-400 uppercase tracking-tighter"
              >
                {axis.label}
              </text>
            </g>
          ))}

          {/* Data Polygon */}
          <polygon
            points={polygonPoints}
            fill={color}
            className="fill-opacity-20 stroke-2"
            stroke={color}
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {data.map((d, i) => {
            const angle = i * angleSlice - Math.PI / 2;
            const maxVal = maxValue || (d3.max(data, (d: PolarData) => d.value) as number) || 100;
            const rScale = d3.scaleLinear().domain([0, maxVal]).range([0, radius]);
            const r = rScale(d.value);
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);

            return (
              <g key={i} className="group cursor-pointer">
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="white"
                  stroke={color}
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover:r-6"
                />
                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect
                    x={x - 20}
                    y={y - 25}
                    width="40"
                    height="18"
                    rx="4"
                    className="fill-slate-800"
                  />
                  <text
                    x={x}
                    y={y - 13}
                    textAnchor="middle"
                    className="text-[9px] fill-white font-bold font-mono"
                  >
                    {d.value}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default PolarPlot;
