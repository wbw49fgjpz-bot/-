import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Search, 
  Sparkles, 
  MapPin, 
  Building, 
  ShieldCheck,
  ArrowRight,
  Home,
  HelpCircle,
  FileText,
  BadgeDollarSign
} from 'lucide-react';
import { HERO_SLIDES } from '../data/properties';

interface HeroSliderProps {
  onQuickSearch: (type: string, city: string, maxPrice: number) => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onQuickSearch, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [quickType, setQuickType] = useState('すべて');
  const [quickCity, setQuickCity] = useState('すべて');
  const [quickPrice, setQuickPrice] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch(quickType, quickCity, quickPrice);
  };

  return (
    <div id="hero" className="relative w-full pt-16 sm:pt-20 bg-slate-950 overflow-hidden select-none">
      
      {/* 1. Main Visual / Hero Slider Container */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              {/* Background Photo with subtle zoom */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Friendly & Clear Gradient Overlay (爽やかな水色・青空と視認性を両立) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#034068]/85 via-sky-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/25" />

              {/* Slide Text Content */}
              <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center py-16">
                <div className="max-w-3xl space-y-4 sm:space-y-5">
                  
                  {/* Eyebrow badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c29d66]/20 border border-[#c29d66]/50 text-[#c29d66] text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#c29d66]" />
                    <span>埼玉県鶴ヶ島市 • 株式会社CTC 心誠不動産</span>
                    <span className="text-white/60">|</span>
                    <span className="text-amber-100">{slide.tag}</span>
                  </div>

                  {/* Main Headline (スライドごとに変化する魅力的なメッセージ) */}
                  <h1 className="font-mincho text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-slate-100 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl drop-shadow">
                    {slide.subtitle}
                  </p>

                  {/* Action Choices: 3 Intent Cards (明るく押しやすい親しみやすいカード) */}
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                    <button
                      onClick={() => onNavigate('sale')}
                      className="p-3.5 rounded-2xl bg-white/95 hover:bg-white text-slate-900 border border-[#c29d66]/40 shadow-md hover:shadow-lg text-left transition-all group cursor-pointer"
                    >
                      <div className="text-[11px] font-bold text-[#96723e]">売りたい・査定したい</div>
                      <div className="text-xs font-bold text-slate-900 flex items-center justify-between mt-1">
                        <span>売却の出口戦略を見る</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#96723e] transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>

                    <button
                      onClick={() => onNavigate('search')}
                      className="p-3.5 rounded-2xl bg-white/95 hover:bg-white text-slate-900 border border-slate-200 shadow-lg hover:shadow-xl text-left transition-all group cursor-pointer"
                    >
                      <div className="text-[11px] font-bold text-slate-600">土地・住まいを探したい</div>
                      <div className="text-xs font-bold text-slate-900 flex items-center justify-between mt-1">
                        <span>特選物件・検索へ</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>

                    <button
                      onClick={() => onNavigate('difficult')}
                      className="p-3.5 rounded-2xl bg-white/95 hover:bg-white text-slate-900 border border-slate-200 shadow-lg hover:shadow-xl text-left transition-all group cursor-pointer"
                    >
                      <div className="text-[11px] font-bold text-emerald-700">空き家・相続を相談</div>
                      <div className="text-xs font-bold text-slate-900 flex items-center justify-between mt-1">
                        <span>現状のまま相談する</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Slide Controls (Previous, Next, Play/Pause) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 z-20 hidden md:flex flex-col gap-2">
          <button
            onClick={prevSlide}
            className="w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center border border-slate-200 shadow-lg backdrop-blur-sm transition-all cursor-pointer hover:scale-105"
            aria-label="前のスライド"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center border border-slate-200 shadow-lg backdrop-blur-sm transition-all cursor-pointer hover:scale-105"
            aria-label="次のスライド"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicators and Play/Pause at bottom-right with Progress Bar */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-200 shadow-lg">
          <button
            onClick={togglePlay}
            className="text-slate-700 hover:text-amber-600 transition-colors cursor-pointer"
            aria-label={isPlaying ? '一時停止' : '再生'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <div className="flex gap-2 items-center">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide ? 'w-8 bg-[#c29d66] shadow-xs' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`スライド ${idx + 1} へ`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-600 ml-1">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>

      {/* 2. 目的別ABCDEクイックナビゲーションバー（明るく親しみやすいホワイト＆カラーアクセント） */}
      <nav className="bg-slate-50 border-y border-slate-200 py-3 relative z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 text-center">
            
            <button
              onClick={() => onNavigate('sale')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-slate-50 border-t-4 border-t-[#96723e] border border-slate-200 text-slate-800 shadow-xs hover:shadow-sm transition-all group flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <span className="text-[10px] font-mono font-bold text-[#96723e]">01 / SELL</span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#96723e]">
                売却・出口戦略
              </strong>
            </button>

            <button
              onClick={() => onNavigate('estimate')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-emerald-50/50 border-t-4 border-t-emerald-600 border border-slate-200 text-slate-800 shadow-xs hover:shadow-sm transition-all group flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <span className="text-[10px] font-mono font-bold text-emerald-700">02 / ESTIMATE</span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                かんたん査定相談
              </strong>
            </button>

            <button
              onClick={() => onNavigate('difficult')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-sky-50/50 border-t-4 border-t-slate-600 border border-slate-200 text-slate-800 shadow-xs hover:shadow-sm transition-all group flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <span className="text-[10px] font-mono font-bold text-slate-700">03 / INHERIT</span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-700">
                空き家・相続相談
              </strong>
            </button>

            <button
              onClick={() => onNavigate('search')}
              className="py-3 px-2 rounded-2xl bg-white hover:bg-sky-50/50 border-t-4 border-t-sky-600 border border-slate-200 text-slate-800 shadow-xs hover:shadow-sm transition-all group flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <span className="text-[10px] font-mono font-bold text-sky-600">04 / BUY</span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600">
                物件を探す・購入
              </strong>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="col-span-2 sm:col-span-1 py-3 px-2 rounded-2xl bg-white hover:bg-slate-50 border-t-4 border-t-[#c29d66] border border-slate-200 text-slate-800 shadow-xs hover:shadow-sm transition-all group flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <span className="text-[10px] font-mono font-bold text-[#96723e]">05 / TALK</span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#96723e]">
                無料相談・LINE
              </strong>
            </button>

          </div>
        </div>
      </nav>

      {/* 法人様・業務提携ミニバナー */}
      <div className="bg-slate-100/90 border-b border-slate-200 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="px-2 py-0.5 rounded-md bg-sky-600 text-white text-[10px] font-bold tracking-wider">
              法人様へ
            </span>
            <span className="text-[11px] sm:text-xs text-slate-700 font-medium">
              弁護士・司法書士・税理士様、不動産同業者様との【業務提携・物件買取・査定作成】受付中
            </span>
          </div>
          <button
            onClick={() => onNavigate('partner')}
            className="text-[11px] sm:text-xs font-bold text-[#96723e] hover:text-[#7d5e33] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>業務提携のご案内・専用窓口</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
