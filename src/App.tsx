import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { SellingExitStrategy } from './components/SellingExitStrategy';
import { EasyEstimate } from './components/EasyEstimate';
import { DifficultPropertyConsult } from './components/DifficultPropertyConsult';
import { CaseStudySlider } from './components/CaseStudySlider';
import { FeaturedProperties } from './components/FeaturedProperties';
import { PropertySearch } from './components/PropertySearch';
import { SaitamaAreaGuide } from './components/SaitamaAreaGuide';
import { WhyChooseUs } from './components/WhyChooseUs';
import { MortgageSimulator } from './components/MortgageSimulator';
import { PhilosophySection } from './components/PhilosophySection';
import { CompanyProfile } from './components/CompanyProfile';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';
import { FavoritesModal } from './components/FavoritesModal';
import { StationsGuidePage } from './components/StationsGuidePage';
import { ColumnsPage } from './components/ColumnsPage';
import { FaqPage } from './components/FaqPage';
import { CorporatePartnerPage } from './components/CorporatePartnerPage';
import { CorporatePartnerSection } from './components/CorporatePartnerSection';
import { PROPERTIES_DATA } from './data/properties';
import { COMPANY_DATA } from './data/company';
import { Property, PropertyFilter } from './types';
import { Phone, Mail, ArrowUp, Send, MessageSquare } from 'lucide-react';

export type AppView = 'home' | 'stations-guide' | 'columns' | 'faq' | 'partner';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [properties] = useState<Property[]>(PROPERTIES_DATA);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ctc_favorites');
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [inquiryPropertyTitle, setInquiryPropertyTitle] = useState<string>('');
  const [simulatorPrice, setSimulatorPrice] = useState<number>(3500);
  const [searchInitialFilter, setSearchInitialFilter] = useState<Partial<PropertyFilter>>({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ctc_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore in strict mode
    }
  }, [favorites]);

  // Handle URL hash changes for SEO direct landing & back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('partner') || hash.includes('corporate') || hash.includes('business')) {
        setCurrentView('partner');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.includes('stations') || hash.includes('local-guide')) {
        setCurrentView('stations-guide');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.includes('columns') || hash.includes('column') || hash.includes('article')) {
        setCurrentView('columns');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.includes('faq') || hash.includes('qa')) {
        setCurrentView('faq');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleInquireProperty = (property: Property) => {
    setInquiryPropertyTitle(`【${property.type}】${property.title}（${property.price.toLocaleString()}万円）`);
    navigateToTarget('contact');
  };

  const handleInquireAllFavorites = (titles: string[]) => {
    setInquiryPropertyTitle(`お気に入り物件（${titles.length}件）についての問い合わせ:\n${titles.join('\n')}`);
    navigateToTarget('contact');
  };

  const handleSimulateLoan = (price: number) => {
    setSimulatorPrice(price);
    navigateToTarget('loan');
  };

  const handleQuickSearch = (type: string, city: string, maxPrice: number) => {
    setSearchInitialFilter({
      type,
      city,
      maxPrice,
    });
    navigateToTarget('search');
  };

  const handleAreaSelect = (cityName: string) => {
    setSearchInitialFilter({
      city: cityName,
    });
    navigateToTarget('search');
  };

  const handleDirectTopicInquire = (topicText: string) => {
    setInquiryPropertyTitle(topicText);
    navigateToTarget('contact');
  };

  const navigateToTarget = (targetId: string) => {
    if (targetId === 'partner' || targetId === 'corporate') {
      window.location.hash = 'partner';
      setCurrentView('partner');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetId === 'stations-guide') {
      window.location.hash = 'stations';
      setCurrentView('stations-guide');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetId === 'columns') {
      window.location.hash = 'columns';
      setCurrentView('columns');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetId === 'faq') {
      window.location.hash = 'faq';
      setCurrentView('faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Default to home view if in another subpage
    if (currentView !== 'home') {
      window.location.hash = '';
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#96723e]/20 selection:text-slate-900">
      
      {/* 1. Header with Top Info Bar & Main Nav */}
      <Header
        onNavigate={navigateToTarget}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
      />

      {/* 2. Main View Router */}
      <main className="flex-1">
        {currentView === 'stations-guide' ? (
          <StationsGuidePage
            onSelectStationProperties={(cityName) => {
              setSearchInitialFilter({ city: cityName });
              navigateToTarget('search');
            }}
            onConsultClick={(note) => {
              setInquiryPropertyTitle(note || '東武東上線 駅紹介ページからのご相談');
              navigateToTarget('contact');
            }}
            onBackToHome={() => navigateToTarget('hero')}
          />
        ) : currentView === 'columns' ? (
          <ColumnsPage
            onConsultClick={(note) => {
              setInquiryPropertyTitle(note || '不動産コラムからのご相談');
              navigateToTarget('contact');
            }}
            onBackToHome={() => navigateToTarget('hero')}
          />
        ) : currentView === 'faq' ? (
          <FaqPage
            onConsultClick={(note) => {
              setInquiryPropertyTitle(note || 'よくある質問からのご相談');
              navigateToTarget('contact');
            }}
            onBackToHome={() => navigateToTarget('hero')}
          />
        ) : currentView === 'partner' ? (
          <CorporatePartnerPage
            onOpenContact={(type) => {
              setInquiryPropertyTitle(type || '法人様・業務提携のご相談');
              navigateToTarget('contact');
            }}
            onBackToHome={() => navigateToTarget('hero')}
          />
        ) : (
          /* Home View (All Core Sections) */
          <>
            {/* Hero Slider */}
            <HeroSlider 
              onQuickSearch={handleQuickSearch} 
              onNavigate={navigateToTarget}
            />

            {/* [売却出口戦略] 出口まで見通す不動産売却 */}
            <SellingExitStrategy
              onOpenEstimate={() => navigateToTarget('estimate')}
              onInquire={(strategyName) => handleDirectTopicInquire(`【売却相談】${strategyName}について詳しい出口戦略を聞きたい`)}
            />

            {/* [かんたん査定] おうちの面積、分かりますか？ */}
            <EasyEstimate
              onDirectMailConsult={(text) => {
                setInquiryPropertyTitle(text);
                navigateToTarget('contact');
              }}
            />

            {/* [空き家・相続] 「売れるか分からない」その不動産も、まずはお話を。 */}
            <DifficultPropertyConsult
              onInquire={handleDirectTopicInquire}
            />

            {/* [成約事例スライド] 実際の売却・出口解決スライドショー */}
            <CaseStudySlider
              onInquire={handleDirectTopicInquire}
            />

            {/* [購入・厳選物件] おすすめ特選物件スライダー */}
            <FeaturedProperties
              properties={properties}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={handleSelectProperty}
              onSimulateLoan={handleSimulateLoan}
              onViewAllClick={() => navigateToTarget('search')}
            />

            {/* [物件検索] モダン多機能検索 */}
            <PropertySearch
              properties={properties}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={handleSelectProperty}
              onSimulateLoan={handleSimulateLoan}
              initialFilter={searchInitialFilter}
            />

            {/* [埼玉の街と駅ガイド] 駅から始まる、わたしの暮らし */}
            <SaitamaAreaGuide
              onSelectArea={handleAreaSelect}
            />

            {/* [強み・資格] 心誠不動産が選ばれる理由・建築専門資格 */}
            <WhyChooseUs />

            {/* [資金計画] 住宅ローン返済シミュレーター */}
            <div id="loan">
              <MortgageSimulator
                initialPrice={simulatorPrice}
                onConsultClick={() => navigateToTarget('contact')}
              />
            </div>

            {/* [経営理念] ミッション・ビジョン・バリュー */}
            <PhilosophySection />

            {/* [法人様へ・業務提携] 士業・同業者・金融機関連携セクション */}
            <CorporatePartnerSection
              onOpenPartnerPage={() => navigateToTarget('partner')}
              onOpenContact={(type) => {
                setInquiryPropertyTitle(type || '法人様・業務提携のご相談');
                navigateToTarget('contact');
              }}
            />

            {/* [会社概要] 株式会社CTC 心誠不動産 */}
            <CompanyProfile />

            {/* [お問い合わせ] まずは、話してみませんか。 */}
            <ContactSection selectedPropertyTitle={inquiryPropertyTitle} />
          </>
        )}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={navigateToTarget} />

      {/* Property Detail Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onInquire={handleInquireProperty}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favorites={favorites}
        properties={properties}
        onRemoveFavorite={handleToggleFavorite}
        onSelectProperty={handleSelectProperty}
        onInquireAll={handleInquireAllFavorites}
      />

      {/* Fixed Sticky Quick Contact Action Bar on Mobile / Desktop */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-sky-600 text-white shadow-md border border-sky-400 flex items-center justify-center hover:bg-sky-700 transition-all pointer-events-auto cursor-pointer"
            aria-label="ページ上部へ戻る"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        )}

        {/* Floating Quick Action Widget (洗練された水色トーン) */}
        <div className="flex items-center gap-2 pointer-events-auto shadow-xl rounded-full p-1.5 bg-sky-600/95 border border-sky-400/80 backdrop-blur-md">
          {/* Quick LINE */}
          <a
            href={COMPANY_DATA.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition-all shadow-xs"
            title="公式LINEで気軽に相談"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LINE相談</span>
          </a>

          {/* Quick Phone */}
          <a
            href={`tel:${COMPANY_DATA.phone.replace(/-/g, '')}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-100 text-xs font-bold border border-slate-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#c29d66]" />
            <span>049-277-5294</span>
          </a>

          {/* Quick Form Consultation */}
          <button
            onClick={() => navigateToTarget('contact')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#96723e] to-[#b38a4d] text-white text-xs font-bold hover:brightness-105 transition-all shadow-xs cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>無料査定</span>
          </button>
        </div>
      </div>

    </div>
  );
}
