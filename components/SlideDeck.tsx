
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Button from './Button';
import Text from './Text';

export interface SlideData {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  background?: string;
  image?: string;
  layout?: 'centered' | 'split' | 'hero';
}

interface SlideDeckProps {
  slides: SlideData[];
  className?: string;
}

const SlideDeck: React.FC<SlideDeckProps> = ({ slides, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      deckRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showOverview) return;
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f') toggleFullscreen();
      if (e.key === 'o') setShowOverview(!showOverview);
      if (e.key === 'Escape' && showOverview) setShowOverview(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, showOverview]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div 
      ref={deckRef}
      className={`relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl group flex flex-col ${className}`}
    >
      {/* Main Slide Viewport */}
      <div className="flex-1 relative overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 translate-x-0 scale-100' : 
              idx < currentIndex ? 'opacity-0 -translate-x-full scale-95' : 'opacity-0 translate-x-full scale-95'
            }`}
          >
            {/* Direct Slide Rendering for Performance */}
            <div 
              className={`w-full h-full flex flex-col relative ${slide.background?.startsWith('bg-') ? slide.background : 'bg-white'}`}
              style={!slide.background?.startsWith('bg-') ? { background: slide.background } : {}}
            >
              {slide.image && slide.layout !== 'split' && (
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  {slide.layout === 'hero' && <div className="absolute inset-0 bg-black/40" />}
                </div>
              )}
              
              <div className={`relative z-10 h-full w-full flex flex-col p-12 ${
                slide.layout === 'centered' ? 'items-center justify-center text-center' : 
                slide.layout === 'hero' ? 'justify-end' : ''
              }`}>
                {slide.layout === 'split' ? (
                  <div className="grid grid-cols-2 h-full -m-12">
                    <div className="p-16 flex flex-col justify-center bg-white">
                      <Text variant="caption" className="text-indigo-600 mb-4">{slide.subtitle}</Text>
                      <Text variant="h1" className="text-slate-900 mb-6">{slide.title}</Text>
                      <div className="text-slate-600 leading-relaxed text-lg">{slide.content}</div>
                    </div>
                    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
                  </div>
                ) : (
                  <div className="max-w-4xl">
                    <Text variant="caption" className={`mb-4 tracking-widest ${slide.layout === 'hero' ? 'text-indigo-300' : 'text-indigo-600'}`}>
                      {slide.subtitle}
                    </Text>
                    <Text variant="h1" className={`mb-8 ${slide.layout === 'hero' ? 'text-white' : 'text-slate-900'} ${slide.layout === 'centered' ? 'text-6xl' : ''}`}>
                      {slide.title}
                    </Text>
                    <div className={`text-xl leading-relaxed ${slide.layout === 'hero' ? 'text-slate-200' : 'text-slate-600'}`}>
                      {slide.content}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300 shadow-[0_0_8px_rgba(99,102,241,0.8)]" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      {/* Overlay: Controls */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none px-6">
        <div className="flex items-center gap-1 p-1 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" onClick={prevSlide} className="text-white hover:bg-white/10 rounded-xl px-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </Button>
          
          <div className="px-4 border-x border-white/10 flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white leading-none">
              {currentIndex + 1} <span className="text-slate-500">/</span> {slides.length}
            </span>
          </div>

          <Button variant="ghost" size="sm" onClick={nextSlide} className="text-white hover:bg-white/10 rounded-xl px-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </Button>

          <div className="w-[1px] h-6 bg-white/10 mx-1" />

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowOverview(!showOverview)} 
            className={`rounded-xl px-3 ${showOverview ? 'text-indigo-400 bg-indigo-400/10' : 'text-white hover:bg-white/10'}`}
            title="Overview (O)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/10 rounded-xl px-3" title="Fullscreen (F)">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
          </Button>
        </div>
      </div>

      {/* Overview Modal */}
      {showOverview && (
        <div className="absolute inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl p-12 overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-12">
             <Text variant="h2" className="text-white">Slide Overview</Text>
             <Button variant="ghost" onClick={() => setShowOverview(false)} className="text-white hover:bg-white/10">Close</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {slides.map((slide, idx) => (
              <button 
                key={slide.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowOverview(false);
                }}
                className={`flex flex-col text-left group transition-all ${idx === currentIndex ? 'scale-105' : 'hover:scale-105'}`}
              >
                <div className={`aspect-video w-full rounded-xl overflow-hidden border-2 transition-all shadow-lg ${
                  idx === currentIndex ? 'border-indigo-500 ring-4 ring-indigo-500/20' : 'border-slate-700 group-hover:border-slate-500'
                }`}>
                  <div className={`w-full h-full bg-slate-800 flex items-center justify-center relative`}>
                     <div className="absolute inset-0 bg-cover bg-center opacity-40" style={slide.image ? { backgroundImage: `url(${slide.image})` } : {}} />
                     <span className="relative z-10 text-slate-500 font-black text-2xl">{idx + 1}</span>
                  </div>
                </div>
                <Text variant="small" className={`mt-3 font-bold truncate w-full ${idx === currentIndex ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {slide.title || `Slide ${idx + 1}`}
                </Text>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideDeck;
