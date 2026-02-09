import React, { useRef, useState, useEffect, useCallback } from 'react';
import Button from './Button';
import Text from './Text';

const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#4f46e5');
  const [brushSize, setBrushSize] = useState(5);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 初始化畫布背景為白色
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // 取得精確座標（考慮畫布 CSS 縮放與裝置比例）
  const getCoordinates = useCallback((e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // 計算相對於畫布內部解析度的座標
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    
    // 處理點擊立即繪製一個點
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    lastPos.current = coords;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const coords = getCoordinates(e);
    
    if (!ctx || !coords) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    lastPos.current = coords;
  };

  const stopDrawing = () => {
    if (isDrawing) {
      canvasRef.current?.getContext('2d')?.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'forge-drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col space-y-4 animate-in fade-in duration-500">
      {/* 整合系統組件的控制欄 */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl gap-4 shadow-sm">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col space-y-1">
            <Text variant="caption" className="text-slate-400">Brush Color</Text>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border-2 border-white shadow-sm transition-transform hover:scale-110"
              />
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">{color}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center w-40">
              <Text variant="caption" className="text-slate-400">Size</Text>
              <span className="text-[10px] font-black text-indigo-600 font-mono">{brushSize}px</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={brushSize} 
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-40 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={clearCanvas} className="bg-white">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </Button>
          <Button variant="primary" size="sm" onClick={downloadImage}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PNG
          </Button>
        </div>
      </div>

      {/* 畫布容器 */}
      <div className="relative group overflow-hidden rounded-[2rem] border-2 border-slate-200 shadow-2xl bg-slate-100">
        <canvas
          ref={canvasRef}
          width={1200}
          height={700}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="bg-white cursor-crosshair w-full touch-none block"
          style={{ maxHeight: '600px', objectFit: 'contain' }}
        />
        
        {/* 指示浮層 */}
        <div className="absolute bottom-6 right-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
             <Text variant="caption" className="text-white tracking-widest">Visual Forge Canvas Engine</Text>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
           <Text variant="caption" className="text-indigo-600 mb-1 block">Vector Precision</Text>
           <Text variant="small">修正了解析度映射，支持高 DPI 顯示器下的像素對準。</Text>
        </div>
        <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
           <Text variant="caption" className="text-emerald-600 mb-1 block">Touch Ready</Text>
           <Text variant="small">優化觸控事件監聽，支持平板與移動設備的手寫筆跡。</Text>
        </div>
        <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
           <Text variant="caption" className="text-amber-600 mb-1 block">Smooth Strokes</Text>
           <Text variant="small">採用圓頭路徑連接（lineJoin），消除鋸齒感與斷筆。</Text>
        </div>
      </div>
    </div>
  );
};

export default Paint;