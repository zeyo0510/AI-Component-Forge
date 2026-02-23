
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface CounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  label?: string;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
  className = '',
  label = 'Counter',
}) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    if (count + step <= max) {
      const newVal = count + step;
      setCount(newVal);
      onChange?.(newVal);
    }
  };

  const decrement = () => {
    if (count - step >= min) {
      const newVal = count - step;
      setCount(newVal);
      onChange?.(newVal);
    }
  };

  const reset = () => {
    setCount(initialValue);
    onChange?.(initialValue);
  };

  return (
    <div className={`flex flex-col items-center gap-4 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm ${className}`}>
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {label}
        </span>
      )}
      
      <div className="flex items-center gap-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={decrement}
          disabled={count <= min}
          className="p-3 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus size={20} />
        </motion.button>

        <div className="relative h-20 w-24 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-5xl font-bold font-mono text-slate-800"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={increment}
          disabled={count >= max}
          className="p-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={20} />
        </motion.button>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-tighter text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
