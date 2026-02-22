
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface BubbleData {
  label: string;
  x: number;
  y: number;
  size: number;
  color?: string;
}

interface BubbleChartProps {
  data: BubbleData[];
  height?: number;
  className?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const BubbleChart: React.FC<BubbleChartProps> = ({
  data,
  height = 400,
  className = '',
  xAxisLabel = 'X Axis',
  yAxisLabel = 'Y Axis',
}) => {
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };

  const { xScale, yScale, sizeScale, innerWidth, innerHeight } = useMemo(() => {
    const width = 800; // Internal SVG coordinate width
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xMin = (d3.min(data, (d: BubbleData) => d.x) as number) ?? 0;
    const xMax = (d3.max(data, (d: BubbleData) => d.x) as number) ?? 100;
    const xScale = d3.scaleLinear()
      .domain([xMin * 0.9, xMax * 1.1] as [number, number])
      .range([0, innerWidth]);

    const yMin = (d3.min(data, (d: BubbleData) => d.y) as number) ?? 0;
    const yMax = (d3.max(data, (d: BubbleData) => d.y) as number) ?? 100;
    const yScale = d3.scaleLinear()
      .domain([yMin * 0.9, yMax * 1.1] as [number, number])
      .range([innerHeight, 0]);

    const sMax = (d3.max(data, (d: BubbleData) => d.size) as number) ?? 10;
    const sizeScale = d3.scaleSqrt()
      .domain([0, sMax] as [number, number])
      .range([4, 40]);

    return { xScale, yScale, sizeScale, innerWidth, innerHeight };
  }, [data, height]);

  const defaultColors = d3.schemeTableau10;

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <svg 
        viewBox={`0 0 800 ${height}`} 
        className="w-full h-auto min-w-[600px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid Lines */}
          {yScale.ticks(5).map((tick, i) => (
            <g key={i} transform={`translate(0, ${yScale(tick)})`}>
              <line x2={innerWidth} className="stroke-slate-100" strokeWidth="1" />
              <text 
                x="-10" 
                dy="0.32em" 
                className="text-[10px] fill-slate-400 font-mono"
                textAnchor="end"
              >
                {tick}
              </text>
            </g>
          ))}
          {xScale.ticks(8).map((tick, i) => (
            <g key={i} transform={`translate(${xScale(tick)}, 0)`}>
              <line y2={innerHeight} className="stroke-slate-100" strokeWidth="1" />
              <text 
                y={innerHeight + 20} 
                className="text-[10px] fill-slate-400 font-mono"
                textAnchor="middle"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Axis Labels */}
          <text
            x={innerWidth / 2}
            y={innerHeight + 45}
            textAnchor="middle"
            className="text-[12px] fill-slate-500 font-bold uppercase tracking-widest"
          >
            {xAxisLabel}
          </text>
          <text
            transform={`rotate(-90)`}
            x={-innerHeight / 2}
            y={-45}
            textAnchor="middle"
            className="text-[12px] fill-slate-500 font-bold uppercase tracking-widest"
          >
            {yAxisLabel}
          </text>

          {/* Bubbles */}
          {data.map((d, i) => (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={xScale(d.x)}
                cy={yScale(d.y)}
                r={sizeScale(d.size)}
                fill={d.color || defaultColors[i % defaultColors.length]}
                className="opacity-70 transition-all duration-300 hover:opacity-100 group-hover:stroke-slate-800 group-hover:stroke-2"
              />
              {/* Tooltip on hover */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <rect
                  x={xScale(d.x) + 10}
                  y={yScale(d.y) - 40}
                  width="80"
                  height="35"
                  rx="4"
                  className="fill-slate-800"
                />
                <text
                  x={xScale(d.x) + 50}
                  y={yScale(d.y) - 25}
                  textAnchor="middle"
                  className="text-[10px] fill-white font-bold"
                >
                  {d.label}
                </text>
                <text
                  x={xScale(d.x) + 50}
                  y={yScale(d.y) - 12}
                  textAnchor="middle"
                  className="text-[9px] fill-slate-300 font-mono"
                >
                  Size: {d.size}
                </text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default BubbleChart;
