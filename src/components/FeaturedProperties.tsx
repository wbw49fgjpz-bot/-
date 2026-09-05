import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface FeaturedPropertiesProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onSimulateLoan: (price: number) => void;
  onViewAllClick: () => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onSimulateLoan,
  onViewAllClick,
}) => {
  const featured = properties.filter((p) => p.isFeatured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll left/right
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="featured" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider uppercase mb-2 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              FEATURED ESTATES SLIDER
            </div>
            <h2 className="font-mincho text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              心誠厳選のおすすめ物件スライド
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              立地・採光・構造安全性に秀でた、今注目の邸宅・分譲地・マンションをピックアップ。
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800 transition-all cursor-pointer"
                aria-label="前へ"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800 transition-all cursor-pointer"
                aria-label="次へ"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={onViewAllClick}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors group cursor-pointer ml-2"
            >
              <span>すべて見る</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal Smooth Slider Track */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featured.map((property) => (
            <div 
              key={property.id} 
              className="w-[290px] sm:w-[320px] md:w-[360px] shrink-0 snap-start"
            >
              <PropertyCard
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
                onSimulateLoan={onSimulateLoan}
                layoutMode="grid"
              />
            </div>
          ))}
        </motion.div>

        {/* Scroll hint bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 mt-2 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            横スクロールや矢印で他の厳選物件もご覧いただけます
          </span>
          <span className="font-mono font-medium">全 {featured.length} 件</span>
        </div>

      </div>
    </section>
  );
};
