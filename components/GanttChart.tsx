
import React, { useMemo } from 'react';
import * as d3 from 'd3';

interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number; // 0 to 100
  dependencies?: string[];
  color?: string;
}

interface GanttChartProps {
  tasks: GanttTask[];
  height?: number;
  className?: string;
}

const GanttChart: React.FC<GanttChartProps> = ({
  tasks,
  height = 400,
  className = '',
}) => {
  const margin = { top: 40, right: 40, bottom: 40, left: 150 };

  const { xScale, yScale, innerWidth, innerHeight, taskHeight } = useMemo(() => {
    const width = 800;
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const minDate = d3.min(tasks, (d: GanttTask) => d.start) || new Date();
    const maxDate = d3.max(tasks, (d: GanttTask) => d.end) || new Date();

    const xScale = d3.scaleTime()
      .domain([d3.timeDay.offset(minDate, -1), d3.timeDay.offset(maxDate, 1)])
      .range([0, innerWidth]);

    const yScale = d3.scaleBand()
      .domain(tasks.map(d => d.id))
      .range([0, innerHeight])
      .padding(0.3);

    return { xScale, yScale, innerWidth, innerHeight, taskHeight: yScale.bandwidth() };
  }, [tasks, height]);

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <svg 
        viewBox={`0 0 800 ${height}`} 
        className="w-full h-auto min-w-[700px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Time Grid Lines */}
          {xScale.ticks(10).map((tick, i) => (
            <g key={i} transform={`translate(${xScale(tick)}, 0)`}>
              <line y2={innerHeight} className="stroke-slate-100" strokeWidth="1" />
              <text 
                y={-10} 
                className="text-[10px] fill-slate-400 font-mono"
                textAnchor="middle"
              >
                {d3.timeFormat("%b %d")(tick)}
              </text>
            </g>
          ))}

          {/* Task Rows */}
          {tasks.map((task) => (
            <g key={task.id} className="group cursor-pointer">
              {/* Task Label */}
              <text
                x={-10}
                y={(yScale(task.id) || 0) + taskHeight / 2}
                dy=".35em"
                textAnchor="end"
                className="text-[11px] font-bold fill-slate-600 uppercase tracking-tight"
              >
                {task.name}
              </text>

              {/* Background Bar */}
              <rect
                x={xScale(task.start)}
                y={yScale(task.id)}
                width={xScale(task.end) - xScale(task.start)}
                height={taskHeight}
                fill={task.color || '#6366f1'}
                rx="4"
                className="opacity-20 transition-opacity group-hover:opacity-30"
              />

              {/* Progress Bar */}
              <rect
                x={xScale(task.start)}
                y={yScale(task.id)}
                width={(xScale(task.end) - xScale(task.start)) * (task.progress / 100)}
                height={taskHeight}
                fill={task.color || '#6366f1'}
                rx="4"
                className="transition-all duration-300 group-hover:brightness-110"
              />

              {/* Progress Text */}
              <text
                x={xScale(task.start) + (xScale(task.end) - xScale(task.start)) * (task.progress / 100) + 5}
                y={(yScale(task.id) || 0) + taskHeight / 2}
                dy=".35em"
                className="text-[9px] font-mono font-bold fill-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {task.progress}%
              </text>
            </g>
          ))}

          {/* Dependency Lines (Simplified) */}
          {tasks.map(task => 
            task.dependencies?.map(depId => {
              const depTask = tasks.find(t => t.id === depId);
              if (!depTask) return null;

              const x1 = xScale(depTask.end);
              const y1 = (yScale(depTask.id) || 0) + taskHeight / 2;
              const x2 = xScale(task.start);
              const y2 = (yScale(task.id) || 0) + taskHeight / 2;

              return (
                <path
                  key={`${depId}-${task.id}`}
                  d={`M ${x1} ${y1} L ${x1 + 10} ${y1} L ${x1 + 10} ${y2} L ${x2} ${y2}`}
                  fill="none"
                  className="stroke-slate-200"
                  strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                />
              );
            })
          )}

          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 6 3, 0 6" className="fill-slate-200" />
            </marker>
          </defs>
        </g>
      </svg>
    </div>
  );
};

export default GanttChart;
