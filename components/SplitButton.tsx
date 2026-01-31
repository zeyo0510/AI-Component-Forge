
import React from 'react';
import Button from './Button';
import Menu from './Menu';
import { MenuItem } from '../types';

interface SplitButtonProps {
  label: string;
  onClick: () => void;
  menuItems: MenuItem[];
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  /* 用於自定義下拉按鈕的 aria-label */
  dropdownAriaLabel?: string;
}

const SplitButton: React.FC<SplitButtonProps> = ({
  label,
  onClick,
  menuItems,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  className = '',
  dropdownAriaLabel = 'Open menu',
}) => {
  // 渲染右側的下拉觸發按鈕
  const menuTrigger = (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      className="rounded-l-none border-l border-white/20 px-2 flex items-center justify-center h-full"
      aria-label={dropdownAriaLabel}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </Button>
  );

  return (
    <div className={`inline-flex items-stretch rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* 主要動作按鈕 */}
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled || isLoading}
        isLoading={isLoading}
        className="rounded-r-none border-r-0"
      >
        {label}
      </Button>

      {/* 下拉菜單觸發器 */}
      <Menu trigger={menuTrigger} items={menuItems} align="right" />
    </div>
  );
};

export default SplitButton;
