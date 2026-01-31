
import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number; // 速度（秒），數值越小越快
  pauseOnHover?: boolean;
  fade?: boolean; // 是否顯示兩側漸變遮罩
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = 'left',
  speed = 20,
  pauseOnHover = true,
  fade = true,
  className = '',
}) => {
  return (
    <div className={`relative flex overflow-hidden group ${className}`}>
      {/* 漸變遮罩 */}
      {fade && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </>
      )}

      {/* 動畫容器 */}
      <div 
        className={`flex min-w-full shrink-0 gap-4 py-4 ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {/* 原始內容 */}
        <div className="flex shrink-0 items-center justify-around gap-4 min-w-full">
          {children}
        </div>
        {/* 複製內容以達成無縫銜接 */}
        <div className="flex shrink-0 items-center justify-around gap-4 min-w-full" aria-hidden="true">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
