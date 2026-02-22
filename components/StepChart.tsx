
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface StepData {
  label: string;
  value: number;
}

interface StepChartProps {
  data: StepData[];
  height?: number;
  className?: string;
  color?: string;
}

const StepChart: React.FC<StepChartProps> = ({
  data,
  height = 300,
  className = '',
  color = '#6366f1',
}) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  const { pathData, xScale, yScale, innerWidth, innerHeight } = useMemo(() => {
    const width = 800;
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = d3.scalePoint()
      .domain(data.map(d => d.label))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, ((d3.max(data, (d: StepData) => d.value) as number) || 0) * 1.1])
      .range([innerHeight, 0]);

    const lineGenerator = d3.line<StepData>()
      .x(d => xScale(d.label) || 0)
      .y(d => yScale(d.value))
      .curve(d3.curveStepAfter);

    return { 
      pathData: lineGenerator(data), 
      xScale, 
      yScale, 
      innerWidth, 
      innerHeight 
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

          {/* X Axis Labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={xScale(d.label)}
              y={innerHeight + 20}
              textAnchor="middle"
              className="text-[10px] fill-slate-400 font-mono"
            >
              {d.label}
            </text>
          ))}

          {/* Step Line */}
          <path
            d={pathData || ''}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />

          {/* Area under the steps */}
          <path
            d={`${pathData} L ${innerWidth} ${innerHeight} L 0 ${innerHeight} Z` || ''}
            fill={color}
            className="opacity-10"
          />

          {/* Data Points */}
          {data.map((d, i) => (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={xScale(d.label)}
                cy={yScale(d.value)}
                r="4"
                fill="white"
                stroke={color}
                strokeWidth="2"
                className="transition-all duration-300 group-hover:r-6"
              />
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <rect
                  x={(xScale(d.label) || 0) - 25}
                  y={yScale(d.value) - 30}
                  width="50"
                  height="20"
                  rx="4"
                  className="fill-slate-800"
                />
                <text
                  x={xScale(d.label)}
                  y={yScale(d.value) - 16}
                  textAnchor="middle"
                  className="text-[10px] fill-white font-bold font-mono"
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

export default StepChart;
