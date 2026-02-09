
import React from 'react';
import Node from './Node';

interface DiagramProps {
  title?: string;
  /* Optional children for React compatibility */
  children?: React.ReactNode;
}

/* Explicitly destructuring props to ensure compatibility with strict TypeScript environments */
const Diagram = ({ children, title }: DiagramProps) => {
  // Mock connection paths (Bézier curve data)
  const connections = [
    { start: [240, 100], end: [400, 50], color: 'stroke-indigo-400' },
    { start: [240, 100], end: [400, 150], color: 'stroke-indigo-400' },
    { start: [624, 50], end: [750, 100], color: 'stroke-emerald-400' },
    { start: [624, 150], end: [750, 100], color: 'stroke-rose-400' },
  ];

  const renderPath = (start: number[], end: number[], color: string) => {
    const midX = (start[0] + end[0]) / 2;
    const path = `M ${start[0]} ${start[1]} C ${midX} ${start[1]}, ${midX} ${end[1]}, ${end[0]} ${end[1]}`;
    return (
      <path 
        d={path} 
        fill="none" 
        className={`${color} stroke-[2]`} 
        strokeDasharray="4 4"
      >
        <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
      </path>
    );
  };

  return (
    <div className="relative w-full h-[400px] bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-inner p-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-300" />
          </marker>
        </defs>
        {connections.map((conn, i) => (
          <React.Fragment key={i}>
            {renderPath(conn.start, conn.end, conn.color)}
          </React.Fragment>
        ))}
      </svg>

      <div className="relative z-10 w-full h-full">
        {/* Layer 1 */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Node title="Trigger" type="input" status="success">API Call Received</Node>
        </div>

        {/* Layer 2 */}
        <div className="absolute left-[360px] top-4">
          <Node title="Validator" type="logic" status="info">Check Schema</Node>
        </div>
        <div className="absolute left-[360px] bottom-4">
          <Node title="Logger" type="logic" status="warning">Write Audit Log</Node>
        </div>

        {/* Layer 3 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Node title="Response" type="output" status="info">Return Status 200</Node>
        </div>
      </div>
    </div>
  );
};

export default Diagram;
