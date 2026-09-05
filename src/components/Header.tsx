import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  Search, 
  Calculator, 
  Building2, 
  Heart, 
  Sparkles, 
  HelpCircle, 
  Compass, 
  ShieldCheck,
  Send,
  MessageSquare,
  Train,
  BookOpen
} from 'lucide-react';
import { COMPANY_DATA } from '../data/company';
import { CtcLogo } from './CtcLogo';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, favoritesCount, onOpenFavorites }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* 1. Business Bar (爽やかな水色のトップバー) */}
      <div className="bg-sky-600 text-sky-50 text-xs border-b border-sky-500 py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center text-[11px] sm:text-xs">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-wide">埼玉県鶴ヶ島市・心誠不動産</span>
            <span className="hidden md:inline-block text-sky-300">|</span>
            <span className="hidden md:inline-block text-sky-100">
              営業時間 {COMPANY_DATA.businessHours}（定休日: {COMPANY_DATA.regularHolidays}）
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${COMPANY_DATA.phone.replace(/-/g, '')}`} 
              className="flex items-center gap-1.5 text-white hover:text-sky-200 font-bold tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-200" />
              <span>TEL {COMPANY_DATA.phone}</span>
            </a>
            <a 
              href={COMPANY_DATA.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white text-[11px] font-bold shadow-xs transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>LINE相談 ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (上質で清潔感のある白＋シックなアクセント) */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 py-2.5' 
          : 'bg-white/95 backdrop-blur-sm shadow-xs py-3 border-b border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo (ユーザー指定のCTCロゴマークを反映) */}
          <button 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center text-left group focus:outline-none cursor-pointer"
          >
            <CtcLogo size="md" color="text-slate-900" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-bold text-slate-700">
            <button 
              onClick={() => handleLinkClick('search')} 
              className="hover:text-[#96723e] transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>物件を探す</span>
            </button>
            <button 
              onClick={() => handleLinkClick('stations-guide')} 
              className="hover:text-[#96723e] transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <Train className="w-3.5 h-3.5 text-[#96723e]" />
              <span>東武東上線 駅紹介</span>
            </button>
            <button 
              onClick={() => handleLinkClick('columns')} 
              className="hover:text-[#96723e] transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#96723e]" />
              <span>売却・相続コラム</span>
            </button>
            <button 
              onClick={() => handleLinkClick('faq')} 
              className="hover:text-[#96723e] transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>よくある質問</span>
            </button>
            <button 
              onClick={() => handleLinkClick('sale')} 
              className="hover:text-[#96723e] transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <span>売却・出口戦略</span>
            </button>
            <button 
              onClick={() => handleLinkClick('difficult')} 
              className="hover:text-[#96723e] transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <span>空き家・難物件</span>
            </button>
            <button 
              onClick={() => handleLinkClick('company')} 
              className="hover:text-[#96723e] transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              <span>会社概要</span>
            </button>
            <button 
              onClick={() => handleLinkClick('partner')} 
              className="px-2.5 py-1 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors flex items-center gap-1 cursor-pointer font-bold shadow-xs border border-sky-500"
              title="士業様・不動産業者様・金融機関様向け"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-100" />
              <span>法人・業務提携</span>
            </button>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Favorites Icon */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              title="お気に入り物件"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Quick Consultation Button (爽やかな水色) */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer border border-sky-500"
            >
              <Mail className="w-3.5 h-3.5 text-sky-100" />
              <span>無料相談・査定</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 cursor-pointer"
              aria-label="メニュー開閉"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-slate-200 text-slate-800 p-5 space-y-4 max-h-[85vh] overflow-y-auto shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleLinkClick('stations-guide')}
              className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-slate-900 font-bold flex items-center gap-1.5"
            >
              <Train className="w-3.5 h-3.5 text-[#96723e]" />
              <span>東武東上線 駅紹介</span>
            </button>
            <button
              onClick={() => handleLinkClick('columns')}
              className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-slate-900 font-bold flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#96723e]" />
              <span>売却・相続コラム</span>
            </button>
            <button
              onClick={() => handleLinkClick('faq')}
              className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-slate-900 font-bold flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#96723e]" />
              <span>よくある質問</span>
            </button>
            <button
              onClick={() => handleLinkClick('search')}
              className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-slate-900 font-bold flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-[#96723e]" />
              <span>物件を探す</span>
            </button>
            <button
              onClick={() => handleLinkClick('sale')}
              className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-slate-800 font-medium"
            >
              売却・出口戦略
            </button>
            <button
              onClick={() => handleLinkClick('estimate')}
              className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-slate-800 font-medium"
            >
              かんたん査定相談
            </button>
            <button
              onClick={() => handleLinkClick('difficult')}
              className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-slate-800 font-medium"
            >
              空き家・相続相談
            </button>
            <button
              onClick={() => handleLinkClick('company')}
              className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-slate-800 font-medium"
            >
              会社概要
            </button>
            <button
              onClick={() => handleLinkClick('partner')}
              className="col-span-2 p-3.5 bg-sky-600 rounded-xl text-left border border-sky-500 text-white font-bold flex items-center justify-between shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-100" />
                <span>法人様へ・業務提携のご案内</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-normal">
                士業・不動産業・金融機関様
              </span>
            </button>
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={COMPANY_DATA.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>公式LINEで無料相談 ↗</span>
            </a>
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Mail className="w-4 h-4 text-sky-100" />
              <span>無料相談・査定依頼フォーム</span>
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-slate-500">
            お電話: <a href={`tel:${COMPANY_DATA.phone.replace(/-/g, '')}`} className="text-slate-800 font-bold underline">{COMPANY_DATA.phone}</a>（10:00〜20:00 火・水定休）
          </div>
        </div>
      )}

    </header>
  );
};
