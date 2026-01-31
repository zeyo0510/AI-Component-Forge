
import React from 'react';
import Menu from './Menu';
import { MenuItem } from '../types';

interface MenuBarCategory {
  label: string;
  items: MenuItem[];
}

interface MenuBarProps {
  categories: MenuBarCategory[];
  className?: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ categories, className = '' }) => {
  return (
    <div className={`flex items-center px-2 py-1 bg-white border-b border-slate-200 select-none ${className}`}>
      {categories.map((category, idx) => (
        <Menu
          key={idx}
          align="left"
          trigger={
            <button className="px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              {category.label}
            </button>
          }
          items={category.items}
        />
      ))}
    </div>
  );
};

export default MenuBar;
