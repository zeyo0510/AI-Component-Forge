
import React from 'react';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'caption';

interface TextProps {
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
  id?: string;
  // Added style property to allow inline CSS styles on the text component
  style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({ variant = 'body', className = '', children, id, style }) => {
  const styles: Record<TextVariant, string> = {
    h1: 'text-4xl font-extrabold text-slate-900 leading-tight',
    h2: 'text-2xl font-bold text-slate-800',
    h3: 'text-xl font-semibold text-slate-800',
    h4: 'text-lg font-medium text-slate-700',
    body: 'text-base text-slate-600 leading-relaxed',
    small: 'text-sm text-slate-500',
    caption: 'text-xs font-bold text-slate-400 uppercase tracking-widest',
  };

  // Maps each variant to a semantically appropriate HTML tag
  const tagMap: Record<TextVariant, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    small: 'small',
    caption: 'span',
  };

  const Component = tagMap[variant];

  return (
    <Component id={id} className={`${styles[variant]} ${className}`} style={style}>
      {children}
    </Component>
  );
};

export default Text;
