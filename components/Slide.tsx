
import React from 'react';
import Text from './Text';

export interface SlideProps {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  background?: string; // CSS background property or gradient
  image?: string;
  layout?: 'centered' | 'split' | 'hero';
  className?: string;
}

const Slide: React.FC<SlideProps> = ({
  title,
  subtitle,
  content,
  background = 'bg-white',
  image,
  layout = 'centered',
  className = '',
}) => {
  const layoutClasses = {
    centered: 'flex flex-col items-center justify-center text-center px-12',
    split: 'grid grid-cols-1 md:grid-cols-2 h-full',
    hero: 'relative flex flex-col justify-end p-12 text-white',
  };

  const bgStyle = background.startsWith('bg-') ? {} : { background };

  return (
    <div 
      className={`w-full h-full min-h-[450px] overflow-hidden rounded-2xl relative transition-all duration-700 ${background.startsWith('bg-') ? background : ''} ${className}`}
      style={bgStyle}
    >
      {image && layout !== 'split' && (
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${image})` }}
        >
          {layout === 'hero' && <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />}
        </div>
      )}

      <div className={`relative z-10 h-full w-full ${layoutClasses[layout]}`}>
        {layout === 'split' ? (
          <>
            <div className="p-12 flex flex-col justify-center">
              {subtitle && <Text variant="caption" className="text-indigo-600 mb-2">{subtitle}</Text>}
              {title && <Text variant="h1" className="mb-4">{title}</Text>}
              <div className="prose prose-slate">
                {content}
              </div>
            </div>
            <div 
              className="bg-slate-100 bg-cover bg-center" 
              style={image ? { backgroundImage: `url(${image})` } : {}}
            />
          </>
        ) : (
          <div className="max-w-3xl">
            {subtitle && (
              <Text 
                variant="caption" 
                className={`mb-4 tracking-[0.2em] ${layout === 'hero' ? 'text-indigo-300' : 'text-indigo-600'}`}
              >
                {subtitle}
              </Text>
            )}
            {title && (
              <Text 
                variant="h1" 
                className={`mb-6 leading-tight ${layout === 'hero' ? 'text-white' : 'text-slate-900'} ${layout === 'centered' ? 'text-5xl' : ''}`}
              >
                {title}
              </Text>
            )}
            <div className={`${layout === 'hero' ? 'text-slate-200' : 'text-slate-600'} text-lg`}>
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
