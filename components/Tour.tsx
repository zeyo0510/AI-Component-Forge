
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TourStep } from '../types';
import Button from './Button';
import Text from './Text';

interface TourProps {
  steps: TourStep[];
  isActive: boolean;
  onFinish: () => void;
  onCancel: () => void;
}

const Tour: React.FC<TourProps> = ({ steps, isActive, onFinish, onCancel }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  const currentStep = steps[currentStepIndex];

  const updateTargetRect = useCallback(() => {
    if (!isActive || !currentStep) return;
    const element = document.querySelector(currentStep.targetSelector);
    if (element) {
      const rect = element.getBoundingClientRect();
      setTargetRect(rect);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setTargetRect(null);
    }
  }, [isActive, currentStep]);

  useEffect(() => {
    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    window.addEventListener('scroll', updateTargetRect);
    return () => {
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect);
    };
  }, [updateTargetRect]);

  if (!isActive || !currentStep) return null;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onFinish();
      setCurrentStepIndex(0);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Popover positioning logic
  const getPopoverStyles = (): React.CSSProperties => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const padding = 16;
    const pos = currentStep.position || 'bottom';
    
    switch (pos) {
      case 'top':
        return { 
          bottom: window.innerHeight - targetRect.top + padding, 
          left: targetRect.left + targetRect.width / 2, 
          transform: 'translateX(-50%)' 
        };
      case 'left':
        return { 
          top: targetRect.top + targetRect.height / 2, 
          right: window.innerWidth - targetRect.left + padding, 
          transform: 'translateY(-50%)' 
        };
      case 'right':
        return { 
          top: targetRect.top + targetRect.height / 2, 
          left: targetRect.right + padding, 
          transform: 'translateY(-50%)' 
        };
      case 'bottom':
      default:
        return { 
          top: targetRect.bottom + padding, 
          left: targetRect.left + targetRect.width / 2, 
          transform: 'translateX(-50%)' 
        };
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none">
      {/* Backdrop with Hole */}
      <svg className="absolute inset-0 w-full h-full pointer-events-auto" style={{ filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.3))' }}>
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - 8}
                y={targetRect.top - 8}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="12"
                fill="black"
                className="transition-all duration-300"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(15, 23, 42, 0.7)"
          mask="url(#tour-mask)"
        />
      </svg>

      {/* Floating Popover */}
      <div 
        ref={popoverRef}
        className="absolute w-[320px] bg-white rounded-2xl shadow-2xl pointer-events-auto animate-in fade-in zoom-in-95 duration-300 flex flex-col overflow-hidden border border-slate-200"
        style={getPopoverStyles()}
      >
        <div className="p-5">
           <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
           </div>
           <Text variant="h4" className="mb-2 text-slate-900">{currentStep.title}</Text>
           <Text variant="small" className="text-slate-500 leading-relaxed">{currentStep.content}</Text>
        </div>

        <div className="bg-slate-50 px-5 py-4 border-t border-slate-100 flex items-center justify-between">
           <div className="flex gap-1">
              {steps.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentStepIndex ? 'bg-indigo-600 w-4' : 'bg-slate-200'}`} />
              ))}
           </div>
           <div className="flex gap-2">
              {currentStepIndex > 0 && (
                <Button variant="ghost" size="sm" onClick={handleBack}>Back</Button>
              )}
              <Button size="sm" onClick={handleNext}>
                {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
           </div>
        </div>

        {/* Decorative Arrow (Optional logic can be added here) */}
      </div>
    </div>
  );
};

export default Tour;
