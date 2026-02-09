
import React from 'react';
import Text from './Text';

interface DividerProps {
  /** 方向：水平或垂直 */
  orientation?: 'horizontal' | 'vertical';
  /** 嵌入的文字標籤 */
  label?: string;
  /** 標籤對齊位置 */
  labelAlign?: 'start' | 'center' | 'end';
  /** 線條樣式：實線、虛線、點線 */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** 額外的 CSS 類名 */
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  labelAlign = 'center',
  variant = 'solid',
  className = '',
}) => {
  const isVertical = orientation === 'vertical';
  const borderStyle = variant === 'solid' ? 'border-solid' : variant === 'dashed' ? 'border-dashed' : 'border-dotted';

  // 垂直分割線渲染邏輯
  if (isVertical) {
    return (
      <div 
        className={`inline-flex self-stretch border-l border-slate-200 ${borderStyle} ${className}`} 
        aria-orientation="vertical" 
        role="separator" 
      />
    );
  }

  // 水平分割線（無標籤）渲染邏輯
  if (!label) {
    return (
      <div 
        className={`w-full border-t border-slate-200 ${borderStyle} ${className}`} 
        role="separator" 
      />
    );
  }

  // 水平分割線（含標籤）渲染邏輯
  const alignClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };

  const lineWeight = "border-t border-slate-200";

  return (
    <div className={`flex items-center w-full ${alignClasses[labelAlign]} ${className}`} role="separator">
      {/* 前段線條：居中或居右對齊時顯示 */}
      {labelAlign !== 'start' && <div className={`flex-1 ${lineWeight} ${borderStyle}`} />}
      
      {/* 標籤內容 */}
      <span className={`px-4 flex-shrink-0`}>
        <Text variant="caption" className="text-[10px] font-black tracking-[0.2em] text-slate-400">
          {label}
        </Text>
      </span>
      
      {/* 後段線條：居左或居中對齊時顯示 */}
      {labelAlign !== 'end' && <div className={`flex-1 ${lineWeight} ${borderStyle}`} />}
    </div>
  );
};

export default Divider;
