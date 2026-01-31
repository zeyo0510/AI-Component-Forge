
import React, { useState } from 'react';

interface VideoPlayerProps {
  poster?: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ poster, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(35);

  return (
    <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl group border border-slate-800">
      {/* Video Content Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${poster || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000'})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
      </div>

      {/* Center Play Button */}
      {!isPlaying && (
        <button 
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center group/btn z-20"
        >
          <div className="w-20 h-20 bg-indigo-600/90 text-white rounded-full flex items-center justify-center shadow-2xl transition-all group-hover/btn:scale-110 group-hover/btn:bg-indigo-500 backdrop-blur-sm">
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </button>
      )}

      {/* Top Title Bar */}
      <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-start z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div>
          <h3 className="text-white font-bold text-lg">{title || 'Introduction to Gemini Flash'}</h3>
          <p className="text-slate-300 text-xs">Project Forge Showcase • 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-md transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
          </button>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent">
        {/* Seek Bar */}
        <div className="relative h-1.5 w-full bg-white/20 rounded-full mb-4 cursor-pointer group/seek">
          <div className="absolute h-full bg-white/40 rounded-full" style={{ width: '60%' }} /> {/* Buffered */}
          <div className="absolute h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }}>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/seek:scale-100 transition-transform" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-indigo-400 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <div className="flex items-center gap-2 group/vol">
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
               <div className="w-0 group-hover/vol:w-20 overflow-hidden transition-all duration-300 h-1 bg-white/20 rounded-full">
                  <div className="h-full bg-white rounded-full" style={{ width: `${volume}%` }} />
               </div>
            </div>
            <span className="text-white text-xs font-mono">03:45 / 12:00</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-white hover:text-indigo-400 transition-colors text-[10px] font-bold tracking-widest px-2 py-1 bg-white/10 rounded-md">1.0x</button>
            <button className="text-white hover:text-indigo-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </button>
            <button className="text-white hover:text-indigo-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
