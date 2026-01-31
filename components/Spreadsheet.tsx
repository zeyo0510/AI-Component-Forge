
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Text from './Text';

interface SpreadsheetProps {
  initialRows?: number;
  initialCols?: number;
  data?: string[][];
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({ 
  initialRows = 15, 
  initialCols = 8,
  data: initialData 
}) => {
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  const [grid, setGrid] = useState<string[][]>(() => {
    if (initialData) return initialData;
    return Array(initialRows).fill(0).map(() => Array(initialCols).fill(''));
  });

  const [activeCell, setActiveCell] = useState<{ r: number; c: number } | null>(null);
  const [editingCell, setEditingCell] = useState<{ r: number; c: number } | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Column labels A, B, C...
  const getColLabel = (index: number) => String.fromCharCode(65 + index);

  const handleCellClick = (r: number, c: number) => {
    setActiveCell({ r, c });
    if (editingCell?.r !== r || editingCell?.c !== c) {
      setEditingCell(null);
    }
  };

  const handleCellDoubleClick = (r: number, c: number) => {
    setEditingCell({ r, c });
    setEditValue(grid[r][c]);
  };

  const handleBlur = () => {
    if (editingCell) {
      const newGrid = [...grid];
      newGrid[editingCell.r][editingCell.c] = editValue;
      setGrid(newGrid);
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (editingCell) {
      if (e.key === 'Enter') {
        handleBlur();
        if (activeCell && activeCell.r < rows - 1) {
          setActiveCell({ r: activeCell.r + 1, c: activeCell.c });
        }
      }
      return;
    }

    if (!activeCell) return;

    const { r, c } = activeCell;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (r > 0) setActiveCell({ r: r - 1, c });
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (r < rows - 1) setActiveCell({ r: r + 1, c });
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (c > 0) setActiveCell({ r, c: c - 1 });
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (c < cols - 1) setActiveCell({ r, c: c + 1 });
        break;
      case 'Enter':
        e.preventDefault();
        setEditingCell({ r, c });
        setEditValue(grid[r][c]);
        break;
      case 'Tab':
        e.preventDefault();
        if (c < cols - 1) setActiveCell({ r, c: c + 1 });
        else if (r < rows - 1) setActiveCell({ r: r + 1, c: 0 });
        break;
      case 'Backspace':
      case 'Delete':
        const newGrid = [...grid];
        newGrid[r][c] = '';
        setGrid(newGrid);
        break;
    }
  };

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  return (
    <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm h-[500px]">
      {/* Formula Bar */}
      <div className="flex items-center gap-4 px-4 py-2 bg-slate-50 border-b border-slate-200 select-none">
        <div className="w-12 text-center text-[10px] font-black text-slate-400 border-r border-slate-200 pr-4">
          {activeCell ? `${getColLabel(activeCell.c)}${activeCell.r + 1}` : ''}
        </div>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-indigo-500 font-black italic text-sm">fx</span>
          <div className="flex-1 text-sm text-slate-600 font-medium truncate">
            {editingCell ? editValue : (activeCell ? grid[activeCell.r][activeCell.c] : '')}
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div 
        className="flex-1 overflow-auto custom-scrollbar relative outline-none"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <table className="border-collapse table-fixed w-full">
          <thead>
            <tr className="sticky top-0 z-30">
              <th className="w-12 h-10 bg-slate-100 border border-slate-200 sticky left-0 z-40"></th>
              {Array(cols).fill(0).map((_, c) => (
                <th 
                  key={c} 
                  className={`w-32 h-10 bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest transition-colors ${
                    activeCell?.c === c ? 'bg-indigo-50 text-indigo-600' : ''
                  }`}
                >
                  {getColLabel(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(rows).fill(0).map((_, r) => (
              <tr key={r}>
                <td 
                  className={`w-12 h-8 bg-slate-100 border border-slate-200 text-center text-[10px] font-bold text-slate-400 sticky left-0 z-20 transition-colors ${
                    activeCell?.r === r ? 'bg-indigo-50 text-indigo-600' : ''
                  }`}
                >
                  {r + 1}
                </td>
                {Array(cols).fill(0).map((_, c) => {
                  const isActive = activeCell?.r === r && activeCell?.c === c;
                  const isEditing = editingCell?.r === r && editingCell?.c === c;
                  
                  return (
                    <td 
                      key={c}
                      onClick={() => handleCellClick(r, c)}
                      onDoubleClick={() => handleCellDoubleClick(r, c)}
                      className={`
                        border border-slate-100 h-8 px-2 text-sm text-slate-600 transition-all relative
                        ${isActive && !isEditing ? 'ring-2 ring-inset ring-indigo-500 z-10 bg-indigo-50/10' : ''}
                        ${!isActive ? 'hover:bg-slate-50' : ''}
                      `}
                    >
                      {isEditing ? (
                        <input
                          ref={inputRef}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleBlur}
                          className="absolute inset-0 w-full h-full px-2 border-none outline-none ring-2 ring-indigo-600 z-20 shadow-xl"
                        />
                      ) : (
                        <div className="truncate w-full">{grid[r][c]}</div>
                      )}
                      
                      {isActive && !isEditing && (
                        <div className="absolute bottom-[-2px] right-[-2px] w-2 h-2 bg-indigo-600 border border-white cursor-crosshair z-20" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Info */}
      <div className="px-4 py-1 bg-slate-50 border-t border-slate-200 flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
        <span>Ready</span>
        <span>Sheet 1 • Rows: {rows} • Cols: {cols}</span>
      </div>
    </div>
  );
};

export default Spreadsheet;
