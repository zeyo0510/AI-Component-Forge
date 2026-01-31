
import React, { useState } from 'react';

interface EditorProps {
  initialValue?: string;
  language?: string;
}

const Editor: React.FC<EditorProps> = ({ initialValue = '', language = 'typescript' }) => {
  const [code, setCode] = useState(initialValue);
  const lines = code.split('\n');

  return (
    <div className="flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-slate-900 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs font-mono text-slate-400 ml-4 uppercase tracking-widest">{language}</span>
        </div>
        <button className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-tighter">Copy Code</button>
      </div>
      <div className="flex font-mono text-sm leading-relaxed overflow-hidden h-[300px]">
        <div className="bg-slate-800/50 px-3 py-4 text-right select-none text-slate-600 border-r border-slate-800">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 bg-transparent text-emerald-400 p-4 outline-none resize-none overflow-auto custom-scrollbar whitespace-pre"
        />
      </div>
    </div>
  );
};

export default Editor;
