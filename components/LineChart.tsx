
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface LineChartData {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartData[];
  height?: number;
  className?: string;
  lineColor?: string;
  areaColor?: string;
  showArea?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 300,
  className = '',
  lineColor = '#4f46e5', // indigo-600
  areaColor = '#eef2ff', // indigo-50
  showArea = true,
}) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  const { xScale, yScale, linePath, areaPath } = useMemo(() => {
    const width = 800; // Internal SVG coordinate width
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = d3.scalePoint()
      .domain(data.map(d => d.label))
      .range([0, innerWidth]);

    const yMax = (d3.max(data, (d: LineChartData) => d.value) as number) || 100;
    const yScale = d3.scaleLinear()
      .domain([0, yMax * 1.1] as [number, number])
      .range([innerHeight, 0]);

    const lineGenerator = d3.line<LineChartData>()
      .x(d => xScale(d.label) || 0)
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3.area<LineChartData>()
      .x(d => xScale(d.label) || 0)
      .y0(innerHeight)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    return {
      xScale,
      yScale,
      linePath: lineGenerator(data) || '',
      areaPath: areaGenerator(data) || '',
    };
  }, [data, height]);

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
              <line x2={800 - margin.left - margin.right} className="stroke-slate-100" strokeWidth="1" />
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

          {/* Area Fill */}
          {showArea && (
            <path
              d={areaPath}
              fill={areaColor}
              className="transition-all duration-500"
            />
          )}

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke={lineColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />

          {/* Data Points */}
          {data.map((d, i) => (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={xScale(d.label)}
                cy={yScale(d.value)}
                r="4"
                fill="white"
                stroke={lineColor}
                strokeWidth="2"
                className="transition-all duration-200 group-hover:r-6"
              />
              <text
                x={xScale(d.label)}
                y={height - margin.top - margin.bottom + 25}
                textAnchor="middle"
                className="text-[10px] fill-slate-400 font-bold uppercase tracking-wider"
              >
                {d.label}
              </text>
              
              {/* Tooltip-like value on hover */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <rect
                  x={(xScale(d.label) || 0) - 20}
                  y={yScale(d.value) - 30}
                  width="40"
                  height="20"
                  rx="4"
                  className="fill-slate-800"
                />
                <text
                  x={xScale(d.label)}
                  y={yScale(d.value) - 16}
                  textAnchor="middle"
                  className="text-[10px] fill-white font-mono font-bold"
                >
                  {d.value}
                </text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default LineChart;
