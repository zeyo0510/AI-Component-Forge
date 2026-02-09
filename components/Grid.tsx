
import React from 'react';
import Text from './Text';

const GridPlaceholder = ({ className = "" }) => (
  <div className={`min-h-[100px] bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-xl flex items-center justify-center animate-pulse ${className}`}>
    <div className="w-4 h-4 rounded-full bg-indigo-200" />
  </div>
);

/* Typing children as optional and providing it in the function signature to prevent TypeScript errors in some environments */
const Grid = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="space-y-12">
      <section>
        <Text variant="caption" className="mb-4 block">12-Column Layout System</Text>
        <div className="grid grid-cols-12 gap-4">
          <GridPlaceholder className="col-span-12" />
          <GridPlaceholder className="col-span-6" />
          <GridPlaceholder className="col-span-6" />
          <GridPlaceholder className="col-span-4" />
          <GridPlaceholder className="col-span-4" />
          <GridPlaceholder className="col-span-4" />
          <GridPlaceholder className="col-span-3" />
          <GridPlaceholder className="col-span-9" />
        </div>
      </section>

      <section>
        <Text variant="caption" className="mb-4 block">Auto-Responsive Masonry (Fluid)</Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GridPlaceholder className="h-64" />
          <GridPlaceholder className="h-48" />
          <GridPlaceholder className="h-72" />
          <GridPlaceholder className="h-32" />
          <GridPlaceholder className="h-40" />
          <GridPlaceholder className="h-56" />
        </div>
      </section>

      <section>
        <Text variant="caption" className="mb-4 block">Asymmetric Dashboard Grid</Text>
        <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-2 gap-4 h-[400px]">
          <GridPlaceholder className="lg:col-span-3 lg:row-span-2" />
          <GridPlaceholder className="lg:col-span-1" />
          <GridPlaceholder className="lg:col-span-1" />
        </div>
      </section>
    </div>
  );
};

export default Grid;
