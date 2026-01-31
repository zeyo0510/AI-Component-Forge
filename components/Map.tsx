
import React, { useState } from 'react';
import { MapLocation, StatusType } from '../types';
import Text from './Text';
import Status from './Status';
import Card from './Card';

interface MapProps {
  locations: MapLocation[];
  title?: string;
  className?: string;
}

const Map: React.FC<MapProps> = ({ locations, title, className = '' }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const selectedLocation = locations.find(l => l.id === selectedId);

  const statusColors = {
    success: 'bg-emerald-500 ring-emerald-400/30',
    warning: 'bg-amber-500 ring-amber-400/30',
    error: 'bg-rose-500 ring-rose-400/30',
    info: 'bg-indigo-500 ring-indigo-400/30',
    neutral: 'bg-slate-400 ring-slate-400/30',
  };

  return (
    <div className={`flex border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-xl h-[600px] ${className}`}>
      {/* Main Map Viewport */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden cursor-move group">
        {/* World Map Background (Stylized Dots) */}
        <svg 
          viewBox="0 0 1000 500" 
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none transition-transform duration-500"
          style={{ transform: `scale(${zoom})` }}
        >
          <path 
            fill="#475569" 
            d="M240,150 L260,150 L260,170 L240,170 Z M300,200 L320,200 L320,220 L300,220 Z M450,120 L480,120 L480,150 L450,150 Z M600,300 L650,300 L650,350 L600,350 Z M700,100 L800,100 L800,250 L700,250 Z M150,250 L200,250 L200,350 L150,350 Z" 
            className="animate-pulse"
          />
          {/* Mock continents for visual context */}
          <rect x="100" y="80" width="150" height="200" rx="40" fill="#334155" opacity="0.3" />
          <rect x="400" y="50" width="180" height="250" rx="60" fill="#334155" opacity="0.3" />
          <rect x="700" y="120" width="200" height="200" rx="50" fill="#334155" opacity="0.3" />
          <rect x="350" y="320" width="100" height="100" rx="30" fill="#334155" opacity="0.3" />
        </svg>

        {/* Markers Container */}
        <div 
          className="absolute inset-0 transition-transform duration-500"
          style={{ transform: `scale(${zoom})` }}
        >
          {locations.map((loc) => (
            <div 
              key={loc.id}
              className="absolute group/marker cursor-pointer"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onClick={() => setSelectedId(loc.id)}
            >
              {/* Outer Pulse */}
              <div className={`absolute -inset-2 rounded-full animate-ping opacity-20 ${statusColors[loc.status].split(' ')[0]}`} />
              
              {/* Marker Point */}
              <div className={`
                relative w-3 h-3 rounded-full border-2 border-white shadow-lg transition-all duration-300
                ${statusColors[loc.status].split(' ')[0]} 
                ${selectedId === loc.id ? 'ring-8 scale-125 z-30' : 'ring-4 z-20 hover:scale-125'}
                ${statusColors[loc.status].split(' ')[1]}
              `} />

              {/* Quick Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-black rounded-lg opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap shadow-2xl z-50 pointer-events-none border border-slate-700">
                {loc.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800" />
              </div>
            </div>
          ))}
        </div>

        {/* Map Header Overlay */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <Text variant="caption" className="text-slate-500 mb-1">Global Mesh</Text>
          <Text variant="h3" className="text-white text-2xl font-black tracking-tighter">
            {title || "Infrastructure Map"}
          </Text>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
          <button 
            onClick={() => setZoom(z => Math.min(3, z + 0.2))}
            className="w-10 h-10 bg-slate-800/80 backdrop-blur text-white rounded-xl border border-slate-700 hover:bg-slate-700 flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>
          <button 
            onClick={() => setZoom(z => Math.max(1, z - 0.2))}
            className="w-10 h-10 bg-slate-800/80 backdrop-blur text-white rounded-xl border border-slate-700 hover:bg-slate-700 flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"/></svg>
          </button>
        </div>
      </div>

      {/* Info Sidebar */}
      <div className="w-80 bg-slate-50 border-l border-slate-200 flex flex-col">
        {selectedLocation ? (
          <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-200 bg-white">
              <div className="flex justify-between items-start mb-4">
                <Status type={selectedLocation.status} label={selectedLocation.status.toUpperCase()} />
                <button onClick={() => setSelectedId(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <Text variant="h3" className="text-slate-900 mb-1">{selectedLocation.name}</Text>
              <Text variant="small" className="text-slate-500 font-mono text-[10px]">LOC_ID: {selectedLocation.id}</Text>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-auto custom-scrollbar">
              <section>
                <Text variant="caption" className="mb-2 block">Current Status</Text>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedLocation.details || "System parameters are operating within established nominal ranges for this geographic sector."}
                </p>
              </section>

              {selectedLocation.metrics && (
                <section className="grid grid-cols-2 gap-3">
                  {selectedLocation.metrics.map((m, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">{m.label}</span>
                      <span className="text-sm font-black text-slate-800">{m.value}</span>
                    </div>
                  ))}
                </section>
              )}

              <section className="pt-4 border-t border-slate-200">
                <Text variant="caption" className="mb-3 block">Telemetry Graph</Text>
                <div className="h-24 flex items-end gap-1 px-1">
                   {[40, 60, 35, 70, 45, 90, 80].map((h, i) => (
                     <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm relative group/bar">
                        <div 
                          className="absolute bottom-0 inset-x-0 bg-indigo-500 rounded-t-sm transition-all duration-1000" 
                          style={{ height: `${h}%` }} 
                        />
                     </div>
                   ))}
                </div>
              </section>
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
              <button className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors">Remote Terminal</button>
              <button className="px-3 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">Logs</button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <Text variant="h4" className="text-slate-400 mb-2">Sector Focus</Text>
            <Text variant="small">Select a data node on the map to visualize sector telemetry and operational status.</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
