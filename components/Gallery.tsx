
import React, { useState, useEffect } from 'react';
import Text from './Text';
import Button from './Button';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  description?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  columns?: { sm: number; md: number; lg: number };
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ 
  items, 
  columns = { sm: 1, md: 2, lg: 3 },
  className = "" 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState(items);

  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, items]);

  const closeLightbox = () => setLightboxIndex(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all
              ${selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }
            `}
          >
            {cat}
            <span className={`ml-2 opacity-50 text-[10px]`}>
              ({cat === 'All' ? items.length : items.filter(i => i.category === cat).length})
            </span>
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <div className={`grid grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} gap-6`}>
        {filteredItems.map((item, idx) => (
          <div 
            key={item.id}
            onClick={() => setLightboxIndex(items.indexOf(item))}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 cursor-zoom-in shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          >
            <img 
              src={item.src} 
              alt={item.alt} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
               <Text variant="caption" className="text-indigo-400 mb-1">{item.category}</Text>
               <h4 className="text-white font-bold text-lg leading-tight mb-1">{item.title}</h4>
               {item.description && <p className="text-slate-300 text-xs line-clamp-1">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <button 
            onClick={closeLightbox}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center h-full max-h-[85vh]">
            <div className="flex-1 h-full flex items-center justify-center overflow-hidden rounded-2xl">
              <img 
                src={items[lightboxIndex].src} 
                alt={items[lightboxIndex].alt} 
                className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-500"
              />
            </div>
            
            <div className="w-full md:w-80 flex flex-col justify-center text-white space-y-4">
              <Text variant="caption" className="text-indigo-400">{items[lightboxIndex].category}</Text>
              <Text variant="h2" className="text-white">{items[lightboxIndex].title}</Text>
              <Text variant="body" className="text-slate-400">{items[lightboxIndex].description || "No additional description provided for this asset."}</Text>
              
              <div className="pt-6 border-t border-white/10 flex gap-4">
                 <Button className="flex-1">Download 4K</Button>
                 <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">License</Button>
              </div>

              <div className="flex justify-between items-center pt-8">
                 <button 
                  disabled={lightboxIndex === 0}
                  onClick={() => setLightboxIndex(lightboxIndex - 1)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                 </button>
                 <span className="text-xs font-mono font-bold text-slate-500">{lightboxIndex + 1} / {items.length}</span>
                 <button 
                  disabled={lightboxIndex === items.length - 1}
                  onClick={() => setLightboxIndex(lightboxIndex + 1)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
