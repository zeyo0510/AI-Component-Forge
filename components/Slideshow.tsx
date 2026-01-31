
import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';

interface SlideshowProps {
  children: React.ReactElement[];
  autoPlay?: boolean;
  interval?: number;
}

const Slideshow: React.FC<SlideshowProps> = ({ 
  children, 
  autoPlay = false, 
  interval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Function to transition to the next slide, wrapping around to the start
  const nextSlide = useCallback(() => {
    if (children.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % children.length);
  }, [children.length]);

  // Function to transition to the previous slide, wrapping around to the end
  const prevSlide = useCallback(() => {
    if (children.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
  }, [children.length]);

  // Setup autoplay timer that pauses when the user hovers over the slideshow
  useEffect(() => {
    if (!autoPlay || children.length === 0 || isHovered) return;
    
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide, children.length, isHovered]);

  // Guard clause for empty children list
  if (!children || children.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-full overflow-hidden group rounded-2xl border border-slate-200 shadow-xl bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container using CSS transforms for smooth sliding animations */}
      <div 
        className="flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, idx) => (
          <div key={idx} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Manual Navigation Controls - Visible on Hover */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={prevSlide}
          className="bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 p-0 flex items-center justify-center border-none shadow-lg pointer-events-auto"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={nextSlide}
          className="bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 p-0 flex items-center justify-center border-none shadow-lg pointer-events-auto"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {children.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx 
                ? 'bg-indigo-600 w-8 shadow-sm' 
                : 'bg-slate-300 w-2.5 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
