
import React from 'react';
import Text from './Text';

interface MindMapNodeProps {
  label: string;
  x: number;
  y: number;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

const MindMapNode: React.FC<MindMapNodeProps> = ({ label, x, y, color, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-8 py-4 text-sm font-bold',
  };

  return (
    <div 
      className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg border-2 transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer flex items-center justify-center whitespace-nowrap ${sizeClasses[size]}`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        backgroundColor: 'white',
        borderColor: color,
        color: color === '#cbd5e1' ? '#64748b' : color
      }}
    >
      {label}
    </div>
  );
};

// Added explicit typing for children as optional to resolve TypeScript compilation errors at usage sites
const MindMap: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  // Define nodes with percentage-based coordinates for responsiveness
  const nodes = [
    { id: 'root', label: 'GEN AI PRODUCT', x: 50, y: 50, color: '#6366f1', size: 'lg' as const },
    
    // Left Branch (Technical)
    { id: 't1', label: 'LLM Infrastructure', x: 30, y: 30, color: '#0ea5e9', size: 'md' as const },
    { id: 't2', label: 'Vector DB', x: 15, y: 20, color: '#0ea5e9', size: 'sm' as const },
    { id: 't3', label: 'GPU Scaling', x: 15, y: 40, color: '#0ea5e9', size: 'sm' as const },
    
    // Top Branch (Design)
    { id: 'd1', label: 'User Experience', x: 50, y: 20, color: '#10b981', size: 'md' as const },
    { id: 'd2', label: 'Chat UI', x: 65, y: 10, color: '#10b981', size: 'sm' as const },
    
    // Right Branch (Marketing)
    { id: 'm1', label: 'Go-To-Market', x: 70, y: 40, color: '#f59e0b', size: 'md' as const },
    { id: 'm2', label: 'Viral Loops', x: 85, y: 35, color: '#f59e0b', size: 'sm' as const },
    { id: 'm3', label: 'Enterprise', x: 85, y: 50, color: '#f59e0b', size: 'sm' as const },
    
    // Bottom Branch (Safety)
    { id: 's1', label: 'Trust & Safety', x: 40, y: 75, color: '#f43f5e', size: 'md' as const },
    { id: 's2', label: 'Red Teaming', x: 25, y: 85, color: '#f43f5e', size: 'sm' as const },
    { id: 's3', label: 'Guardrails', x: 55, y: 85, color: '#f43f5e', size: 'sm' as const },
  ];

  // Define connections
  const connections = [
    { from: 'root', to: 't1', color: '#0ea5e9' },
    { from: 't1', to: 't2', color: '#0ea5e9' },
    { from: 't1', to: 't3', color: '#0ea5e9' },
    { from: 'root', to: 'd1', color: '#10b981' },
    { from: 'd1', to: 'd2', color: '#10b981' },
    { from: 'root', to: 'm1', color: '#f59e0b' },
    { from: 'm1', to: 'm2', color: '#f59e0b' },
    { from: 'm1', to: 'm3', color: '#f59e0b' },
    { from: 'root', to: 's1', color: '#f43f5e' },
    { from: 's1', to: 's2', color: '#f43f5e' },
    { from: 's1', to: 's3', color: '#f43f5e' },
  ];

  const renderConnection = (fromId: string, toId: string, color: string) => {
    const from = nodes.find(n => n.id === fromId);
    const to = nodes.find(n => n.id === toId);
    if (!from || !to) return null;

    // Use percentage coordinates for SVG
    const x1 = from.x;
    const y1 = from.y;
    const x2 = to.x;
    const y2 = to.y;

    // Control points for Bézier curve
    const cx1 = x1 + (x2 - x1) * 0.5;
    const cy1 = y1;
    const cx2 = x1 + (x2 - x1) * 0.5;
    const cy2 = y2;

    const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

    return (
      <g key={`${fromId}-${toId}`}>
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          strokeLinecap="round"
          className="opacity-30"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="0.4"
          strokeDasharray="2 4"
          vectorEffect="non-scaling-stroke"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="20"
            to="0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    );
  };

  return (
    <div className="relative w-full h-[600px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-inner group">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      {/* SVG Connections Layer */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map(conn => renderConnection(conn.from, conn.to, conn.color))}
      </svg>

      {/* Nodes Layer */}
      <div className="relative w-full h-full">
        {nodes.map(node => (
          <MindMapNode 
            key={node.id}
            label={node.label}
            x={node.x}
            y={node.y}
            color={node.color}
            size={node.size}
          />
        ))}
      </div>

      {/* Legend / Overlay */}
      <div className="absolute bottom-6 left-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm pointer-events-none">
        <Text variant="caption" className="block mb-2">Branch Themes</Text>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-sky-500" /><span className="text-[10px] text-slate-500 font-bold">TECH</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] text-slate-500 font-bold">DESIGN</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-[10px] text-slate-500 font-bold">GROWTH</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /><span className="text-[10px] text-slate-500 font-bold">TRUST</span></div>
        </div>
      </div>
    </div>
  );
};

export default MindMap;