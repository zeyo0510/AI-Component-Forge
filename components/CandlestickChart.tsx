
import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { CandlestickData } from '../types';

interface CandlestickChartProps {
  data: CandlestickData[];
  height?: number;
  className?: string;
  positiveColor?: string;
  negativeColor?: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  height = 300,
  className = '',
  positiveColor = '#10b981', // emerald-500
  negativeColor = '#f43f5e', // rose-500
}) => {
  const margin = { top: 20, right: 40, bottom: 30, left: 40 };

  const { xScale, yScale, candleWidth } = useMemo(() => {
    const width = 800; // Reference width for internal SVG coordinates
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, innerWidth])
      .padding(0.3);

    const yMin = (d3.min(data, (d: CandlestickData) => d.low) as number) ?? 0;
    const yMax = (d3.max(data, (d: CandlestickData) => d.high) as number) ?? 100;
    const padding = (yMax - yMin) * 0.1;

    const yScale = d3.scaleLinear()
      .domain([yMin - padding, yMax + padding] as [number, number])
      .range([innerHeight, 0]);

    return { xScale, yScale, candleWidth: xScale.bandwidth() };
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
                className="text-[10px] fill-slate-400 font-mono text-right"
                textAnchor="end"
              >
                {tick.toFixed(0)}
              </text>
            </g>
          ))}

          {/* Candlesticks */}
          {data.map((d, i) => {
            const isPositive = d.close >= d.open;
            const x = xScale(d.date) || 0;
            const color = isPositive ? positiveColor : negativeColor;

            return (
              <g key={i} className="transition-opacity hover:opacity-80 cursor-crosshair">
                {/* Wick */}
                <line
                  x1={x + candleWidth / 2}
                  y1={yScale(d.high)}
                  x2={x + candleWidth / 2}
                  y2={yScale(d.low)}
                  stroke={color}
                  strokeWidth="1.5"
                />
                {/* Body */}
                <rect
                  x={x}
                  y={yScale(Math.max(d.open, d.close))}
                  width={candleWidth}
                  height={Math.abs(yScale(d.open) - yScale(d.close)) || 1}
                  fill={color}
                  rx="1"
                />
                
                {/* Date Label (every few items) */}
                {i % Math.ceil(data.length / 6) === 0 && (
                  <text
                    x={x + candleWidth / 2}
                    y={height - margin.top - margin.bottom + 20}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 font-bold uppercase tracking-wider"
                  >
                    {d.date}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default CandlestickChart;
