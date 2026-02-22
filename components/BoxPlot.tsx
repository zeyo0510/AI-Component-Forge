
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface BoxPlotData {
  label: string;
  values: number[];
  color?: string;
}

interface BoxPlotProps {
  data: BoxPlotData[];
  height?: number;
  className?: string;
}

const BoxPlot: React.FC<BoxPlotProps> = ({
  data,
  height = 400,
  className = '',
}) => {
  const margin = { top: 20, right: 30, bottom: 50, left: 60 };

  const { boxes, xScale, yScale, innerWidth, innerHeight } = useMemo(() => {
    const width = 800;
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const allValues = data.flatMap(d => d.values);
    const minVal = (d3.min(allValues) as unknown as number) || 0;
    const maxVal = (d3.max(allValues) as unknown as number) || 100;

    const yScale = d3.scaleLinear()
      .domain([minVal * 0.9, maxVal * 1.1])
      .range([innerHeight, 0]);

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.4);

    const boxes = data.map(d => {
      const sortedValues = [...d.values].sort(d3.ascending);
      const q1 = d3.quantile(sortedValues, 0.25) || 0;
      const median = d3.quantile(sortedValues, 0.5) || 0;
      const q3 = d3.quantile(sortedValues, 0.75) || 0;
      const min = sortedValues[0];
      const max = sortedValues[sortedValues.length - 1];
      const interQuantileRange = q3 - q1;
      const minWhisker = Math.max(min, q1 - 1.5 * interQuantileRange);
      const maxWhisker = Math.min(max, q3 + 1.5 * interQuantileRange);
      
      const outliers = sortedValues.filter(v => v < minWhisker || v > maxWhisker);

      return {
        label: d.label,
        q1: yScale(q1),
        median: yScale(median),
        q3: yScale(q3),
        min: yScale(minWhisker),
        max: yScale(maxWhisker),
        outliers: outliers.map(v => yScale(v)),
        color: d.color || '#6366f1',
        x: xScale(d.label) || 0,
        width: xScale.bandwidth(),
        stats: { min, q1, median, q3, max }
      };
    });

    return { boxes, xScale, yScale, innerWidth, innerHeight };
  }, [data, height]);

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <svg 
        viewBox={`0 0 800 ${height}`} 
        className="w-full h-auto min-w-[600px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Y Axis Grid Lines */}
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
              x={(xScale(d.label) || 0) + xScale.bandwidth() / 2}
              y={innerHeight + 25}
              textAnchor="middle"
              className="text-[11px] font-bold fill-slate-500 uppercase tracking-tight"
            >
              {d.label}
            </text>
          ))}

          {/* Box Plots */}
          {boxes.map((box, i) => (
            <g key={i} className="group cursor-pointer">
              {/* Vertical line (Whisker) */}
              <line
                x1={box.x + box.width / 2}
                x2={box.x + box.width / 2}
                y1={box.min}
                y2={box.max}
                stroke="currentColor"
                className="text-slate-300"
                strokeWidth="1.5"
              />

              {/* Box */}
              <rect
                x={box.x}
                y={box.q3}
                width={box.width}
                height={box.q1 - box.q3}
                fill={box.color}
                className="fill-opacity-20 stroke-2"
                stroke={box.color}
                rx="2"
              />

              {/* Median Line */}
              <line
                x1={box.x}
                x2={box.x + box.width}
                y1={box.median}
                y2={box.median}
                stroke={box.color}
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Whisker Caps */}
              <line x1={box.x + box.width * 0.25} x2={box.x + box.width * 0.75} y1={box.min} y2={box.min} stroke="currentColor" className="text-slate-300" strokeWidth="1.5" />
              <line x1={box.x + box.width * 0.25} x2={box.x + box.width * 0.75} y1={box.max} y2={box.max} stroke="currentColor" className="text-slate-300" strokeWidth="1.5" />

              {/* Outliers */}
              {box.outliers.map((outlier, j) => (
                <circle
                  key={j}
                  cx={box.x + box.width / 2}
                  cy={outlier}
                  r="3"
                  fill="none"
                  stroke={box.color}
                  strokeWidth="1"
                  className="opacity-60"
                />
              ))}

              {/* Tooltip Info (Visible on Hover) */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <rect
                  x={box.x + box.width + 10}
                  y={box.median - 40}
                  width="100"
                  height="80"
                  rx="6"
                  className="fill-slate-800 shadow-xl"
                />
                <text x={box.x + box.width + 20} y={box.median - 25} className="text-[9px] fill-slate-400 font-mono">Max: {box.stats.max.toFixed(1)}</text>
                <text x={box.x + box.width + 20} y={box.median - 10} className="text-[9px] fill-white font-bold font-mono">Q3: {box.stats.q3.toFixed(1)}</text>
                <text x={box.x + box.width + 20} y={box.median + 5} className="text-[9px] fill-white font-bold font-mono">Med: {box.stats.median.toFixed(1)}</text>
                <text x={box.x + box.width + 20} y={box.median + 20} className="text-[9px] fill-white font-bold font-mono">Q1: {box.stats.q1.toFixed(1)}</text>
                <text x={box.x + box.width + 20} y={box.median + 35} className="text-[9px] fill-slate-400 font-mono">Min: {box.stats.min.toFixed(1)}</text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default BoxPlot;
