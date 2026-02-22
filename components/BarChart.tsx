
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartData[];
  height?: number;
  className?: string;
  barColor?: string;
  horizontal?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 300,
  className = '',
  barColor = '#6366f1', // indigo-500
  horizontal = false,
}) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  const { xScale, yScale, innerWidth, innerHeight } = useMemo(() => {
    const width = 800; // Internal SVG coordinate width
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    if (horizontal) {
      const yScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerHeight])
        .padding(0.2);

      const xMax = (d3.max(data, (d: BarChartData) => d.value) as number) || 100;
      const xScale = d3.scaleLinear()
        .domain([0, xMax * 1.1])
        .range([0, innerWidth]);

      return { xScale, yScale, innerWidth, innerHeight };
    } else {
      const xScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerWidth])
        .padding(0.2);

      const yMax = (d3.max(data, (d: BarChartData) => d.value) as number) || 100;
      const yScale = d3.scaleLinear()
        .domain([0, yMax * 1.1])
        .range([innerHeight, 0]);

      return { xScale, yScale, innerWidth, innerHeight };
    }
  }, [data, height, horizontal]);

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <svg 
        viewBox={`0 0 800 ${height}`} 
        className="w-full h-auto min-w-[600px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {horizontal ? (
            <>
              {/* Vertical Grid Lines */}
              {(xScale as d3.ScaleLinear<number, number>).ticks(5).map((tick, i) => (
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

              {/* Bars */}
              {data.map((d, i) => (
                <g key={i} className="group cursor-pointer">
                  <rect
                    x="0"
                    y={yScale(d.label)}
                    width={xScale(d.value)}
                    height={(yScale as d3.ScaleBand<string>).bandwidth()}
                    fill={d.color || barColor}
                    rx="4"
                    className="transition-all duration-300 hover:opacity-80"
                  />
                  <text
                    x="-10"
                    y={(yScale(d.label) || 0) + (yScale as d3.ScaleBand<string>).bandwidth() / 2}
                    dy="0.35em"
                    textAnchor="end"
                    className="text-[10px] fill-slate-500 font-bold uppercase tracking-wider"
                  >
                    {d.label}
                  </text>
                  <text
                    x={xScale(d.value) + 10}
                    y={(yScale(d.label) || 0) + (yScale as d3.ScaleBand<string>).bandwidth() / 2}
                    dy="0.35em"
                    className="text-[10px] fill-slate-400 font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {d.value}
                  </text>
                </g>
              ))}
            </>
          ) : (
            <>
              {/* Horizontal Grid Lines */}
              {(yScale as d3.ScaleLinear<number, number>).ticks(5).map((tick, i) => (
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

              {/* Bars */}
              {data.map((d, i) => (
                <g key={i} className="group cursor-pointer">
                  <rect
                    x={xScale(d.label)}
                    y={yScale(d.value)}
                    width={(xScale as d3.ScaleBand<string>).bandwidth()}
                    height={innerHeight - yScale(d.value)}
                    fill={d.color || barColor}
                    rx="4"
                    className="transition-all duration-300 hover:opacity-80"
                  />
                  <text
                    x={(xScale(d.label) || 0) + (xScale as d3.ScaleBand<string>).bandwidth() / 2}
                    y={innerHeight + 20}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-500 font-bold uppercase tracking-wider"
                  >
                    {d.label}
                  </text>
                  <text
                    x={(xScale(d.label) || 0) + (xScale as d3.ScaleBand<string>).bandwidth() / 2}
                    y={yScale(d.value) - 10}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {d.value}
                  </text>
                </g>
              ))}
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

export default BarChart;
