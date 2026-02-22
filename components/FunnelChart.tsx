
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface FunnelData {
  label: string;
  value: number;
  color?: string;
}

interface FunnelChartProps {
  data: FunnelData[];
  height?: number;
  className?: string;
}

const FunnelChart: React.FC<FunnelChartProps> = ({
  data,
  height = 400,
  className = '',
}) => {
  const margin = { top: 20, right: 120, bottom: 20, left: 120 };

  const { stages, innerWidth } = useMemo(() => {
    const width = 800; // Internal SVG coordinate width
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const maxValue = (d3.max(data, (d: FunnelData) => d.value) as number) || 1;
    const stageHeight = innerHeight / data.length;

    const stages = data.map((d, i) => {
      // For the last stage, we assume it tapers slightly or stays same width if it's the end of the funnel
      const nextValue = data[i + 1]?.value ?? d.value * 0.8; 
      
      const currentWidth = (d.value / maxValue) * innerWidth;
      const nextWidth = (nextValue / maxValue) * innerWidth;

      const x1 = (innerWidth - currentWidth) / 2;
      const x2 = x1 + currentWidth;
      const x3 = (innerWidth - nextWidth) / 2 + nextWidth;
      const x4 = (innerWidth - nextWidth) / 2;

      const y1 = i * stageHeight;
      const y2 = (i + 1) * stageHeight;

      const points = `${x1},${y1} ${x2},${y1} ${x3},${y2} ${x4},${y2}`;

      return {
        ...d,
        points,
        centerX: innerWidth / 2,
        centerY: y1 + stageHeight / 2,
        percentage: i > 0 ? (d.value / data[0].value) * 100 : 100
      };
    });

    return { stages, innerWidth };
  }, [data, height]);

  const defaultColors = d3.schemeTableau10;
  const maxVal = (d3.max(data, (d: FunnelData) => d.value) as number) || 1;

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <svg 
        viewBox={`0 0 800 ${height}`} 
        className="w-full h-auto min-w-[600px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {stages.map((stage, i) => (
            <g key={i} className="group cursor-pointer">
              <polygon
                points={stage.points}
                fill={stage.color || defaultColors[i % defaultColors.length]}
                className="opacity-80 transition-all duration-300 hover:opacity-100 group-hover:stroke-slate-800 group-hover:stroke-1"
              />
              
              {/* Label in the middle */}
              <text
                x={stage.centerX}
                y={stage.centerY}
                textAnchor="middle"
                dy=".35em"
                className="text-[12px] font-bold fill-white pointer-events-none drop-shadow-sm select-none"
              >
                {stage.label}: {stage.value.toLocaleString()}
              </text>

              {/* Percentage on the side */}
              <g transform={`translate(${stage.centerX + ( (data[i].value / maxVal * innerWidth) / 2 ) + 20}, ${stage.centerY})`}>
                <text
                  dy=".35em"
                  className="text-[10px] font-mono fill-slate-400 font-bold"
                >
                  {Math.round(stage.percentage)}%
                </text>
              </g>

              {/* Conversion Rate Label (if not first stage) */}
              {i > 0 && (
                <text
                  x={-10}
                  y={stage.centerY}
                  textAnchor="end"
                  dy=".35em"
                  className="text-[10px] fill-slate-400 font-medium italic"
                >
                  {Math.round((stage.value / data[i-1].value) * 100)}% conv.
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default FunnelChart;
