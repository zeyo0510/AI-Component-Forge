
import React from 'react';
import Text from './Text';
import Status from './Status';
import Button from './Button';
import { StatusType } from '../types';

interface DocumentProps {
  title: string;
  author: string;
  date: string;
  status: StatusType;
  content: React.ReactNode;
  tags?: string[];
  className?: string;
}

const Document: React.FC<DocumentProps> = ({
  title,
  author,
  date,
  status,
  content,
  tags = [],
  className = '',
}) => {
  return (
    <div className={`flex flex-col bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden max-w-4xl mx-auto my-8 ${className}`}>
      {/* Header / Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <Text variant="small" className="font-bold text-slate-400 uppercase tracking-widest text-[10px] leading-none mb-1">Project Forge Document</Text>
            <Text variant="h4" className="text-sm font-black leading-none">{title}</Text>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs">Edit</Button>
          <Button variant="primary" size="sm" className="h-8 px-3 text-xs">Share</Button>
        </div>
      </div>

      {/* Meta Bar */}
      <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Author</span>
            <span className="text-xs font-bold text-slate-700">{author}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Date</span>
            <span className="text-xs font-bold text-slate-700">{date}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Status</span>
            <div className="scale-75 origin-left mt-0.5">
              <Status type={status} label={status.toUpperCase()} />
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase border border-slate-200">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="px-12 py-16 min-h-[600px] flex flex-col font-serif">
        <div className="prose prose-slate max-w-none">
          {content}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-8 py-4 flex items-center justify-between">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2025 Component Forge Automation
        </div>
        <div className="text-[10px] font-bold text-slate-400">
          Page 1 of 1
        </div>
      </div>
    </div>
  );
};

export default Document;
