
import React, { useState } from 'react';
import { StatusType } from '../types';

interface AccordionItemProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  status?: StatusType;
  icon?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  children,
  isOpen,
  onToggle,
  status,
  icon
}) => {
  const statusDots = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-indigo-500',
    neutral: 'bg-slate-300',
  };

  return (
    <div className={`border-b border-slate-100 last:border-none transition-all duration-300 ${isOpen ? 'bg-indigo-50/30' : 'bg-white'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          {icon && <div className={`text-slate-400 transition-colors ${isOpen ? 'text-indigo-600' : ''}`}>{icon}</div>}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-indigo-700' : 'text-slate-700 group-hover:text-indigo-600'}`}>
                {title}
              </span>
              {status && <div className={`w-1.5 h-1.5 rounded-full ${statusDots[status]}`} />}
            </div>
            {subtitle && <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">{subtitle}</span>}
          </div>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-300 group-hover:text-slate-400'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 pt-0 text-sm text-slate-500 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: {
    id: string;
    title: string;
    subtitle?: string;
    content: React.ReactNode;
    status?: StatusType;
    icon?: React.ReactNode;
  }[];
  allowMultiple?: boolean;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, className = '' }) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    const next = new Set(openIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      if (!allowMultiple) next.clear();
      next.add(id);
    }
    setOpenIds(next);
  };

  return (
    <div className={`border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          {...item}
          isOpen={openIds.has(item.id)}
          onToggle={() => handleToggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
