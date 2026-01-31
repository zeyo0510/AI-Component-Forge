
import React, { useState } from 'react';

interface AudioPlayerProps {
  title: string;
  artist: string;
  cover?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, artist, cover }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(65);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-6 max-w-md hover:shadow-md transition-shadow">
      {/* Cover Art */}
      <div className={`relative w-16 h-16 rounded-xl overflow-hidden shadow-lg transition-transform duration-1000 ${isPlaying ? 'rotate-12 scale-105' : ''}`}>
        <img 
          src={cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=200'} 
          className="w-full h-full object-cover" 
          alt="Cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
           <div className={`w-3 h-3 bg-white rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>
      </div>

      {/* Info & Controls */}
      <div className="flex-1 min-w-0">
        <div className="mb-3">
          <h4 className="font-bold text-slate-900 truncate">{title}</h4>
          <p className="text-xs text-slate-500 font-medium truncate">{artist}</p>
        </div>
        
        {/* Simple Progress Bar */}
        <div className="w-full h-1 bg-slate-100 rounded-full mb-3 cursor-pointer group">
          <div className="h-full bg-indigo-600 rounded-full relative" style={{ width: `${progress}%` }}>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all shadow-md active:scale-90"
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
          </div>
          <span className="text-[10px] font-mono text-slate-400">02:30 / 03:45</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
