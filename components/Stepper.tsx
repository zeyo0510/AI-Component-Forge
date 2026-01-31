
import React from 'react';
import { StepperItem } from '../types';
import Text from './Text';

interface StepperProps {
  steps: StepperItem[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (index: number) => void;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  onStepClick,
  className = '',
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={`${isVertical ? 'flex flex-col' : 'flex items-center w-full'} ${className}`}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        const isPending = idx > currentStep;
        const isLast = idx === steps.length - 1;

        return (
          <React.Fragment key={idx}>
            <div 
              className={`
                relative flex items-start gap-4 transition-all duration-300
                ${!isLast && !isVertical ? 'flex-1' : ''}
                ${onStepClick && isCompleted ? 'cursor-pointer group' : ''}
              `}
              onClick={() => onStepClick && isCompleted && onStepClick(idx)}
            >
              {/* Step Circle */}
              <div className="relative flex flex-col items-center">
                <div 
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-10
                    ${isCompleted ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : ''}
                    ${isActive ? 'bg-white border-indigo-600 text-indigo-600 scale-110' : ''}
                    ${isPending ? 'bg-white border-slate-200 text-slate-400' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span className="text-sm font-bold">{idx + 1}</span>
                  )}

                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-25" />
                  )}
                </div>

                {/* Vertical Line Container */}
                {isVertical && !isLast && (
                  <div 
                    className={`w-0.5 h-12 my-2 transition-all duration-700 ${isCompleted ? 'bg-indigo-600' : 'bg-slate-100'}`} 
                  />
                )}
              </div>

              {/* Step Content */}
              <div className={`flex flex-col ${!isVertical ? 'pr-4' : ''}`}>
                <Text 
                  variant="caption" 
                  className={`
                    font-black tracking-tight transition-colors mb-0.5
                    ${isActive ? 'text-indigo-600' : isCompleted ? 'text-slate-900 group-hover:text-indigo-600' : 'text-slate-400'}
                  `}
                >
                  {step.label}
                </Text>
                {step.description && (
                  <p className="text-[10px] text-slate-400 font-medium leading-tight max-w-[120px]">
                    {step.description}
                  </p>
                )}
              </div>

              {/* Horizontal Line Connector */}
              {!isVertical && !isLast && (
                <div className="flex-1 flex items-center px-4">
                  <div className="h-[2px] w-full bg-slate-100 relative rounded-full overflow-hidden">
                    <div 
                      className={`absolute inset-0 bg-indigo-600 transition-all duration-700 ease-in-out`}
                      style={{ transform: `translateX(${isCompleted ? '0%' : '-100%'})` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
