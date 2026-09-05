import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Train, 
  MapPin, 
  Clock, 
  Building2, 
  Home, 
  DollarSign, 
  School, 
  TreePine, 
  ShoppingCart, 
  Hospital, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Search,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { STATIONS_DATA, StationInfo } from '../data/stationsData';

interface StationsGuidePageProps {
  onSelectStationProperties: (cityName: string) => void;
  onConsultClick: (note?: string) => void;
  onBackToHome: () => void;
}

export const StationsGuidePage: React.FC<StationsGuidePageProps> = ({
  onSelectStationProperties,
  onConsultClick,
  onBackToHome,
}) => {
  const [selectedStationId, setSelectedStationId] = useState<string>('tsurugashima');
  const currentStation = STATIONS_DATA.find((s) => s.id === selectedStationId) || STATIONS_DATA[0];

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-24 text-slate-800">
      
      {/* 1. Breadcrumb & Page Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="パンくずリスト">
          <button onClick={onBackToHome} className="hover:text-slate-900 transition-colors cursor-pointer">
            ホーム
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">東武東上線・主要駅別 街と不動産徹底ガイド</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-slate-200">
              <Train className="w-3.5 h-3.5 text-[#96723e]" />
              TOBU TOJO LINE AREA GUIDE
            </div>
            <h1 className="font-mincho text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              東武東上線・埼玉西部の<br />
              <span className="text-[#96723e]">主要駅別 街と不動産相場ガイド</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              鶴ヶ島駅・若葉駅・川越駅・坂戸駅など、東武東上線沿線の住みやすさ、アクセス所要時間、新築・中古戸建て・土地の坪単価相場、小中学校や買い物の利便性を地元密着の心誠不動産が徹底解説します。
            </p>
          </div>
          
          {/* Subtle decorative background watermark */}
          <div className="absolute -right-8 -bottom-10 opacity-5 pointer-events-none select-none text-9xl font-serif">
            TOJO
          </div>
        </div>
      </div>

      {/* 2. Station Horizontal Selector Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
          {STATIONS_DATA.map((station) => (
            <button
              key={station.id}
              onClick={() => setSelectedStationId(station.id)}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all border flex items-center gap-2 cursor-pointer ${
                selectedStationId === station.id
                  ? 'bg-[#1e2638] text-white border-[#1e2638] shadow-sm ring-2 ring-[#96723e]/40'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Train className={`w-4 h-4 ${selectedStationId === station.id ? 'text-[#c29d66]' : 'text-slate-400'}`} />
              <span>{station.name}</span>
              <span className="text-[10px] opacity-75 font-normal">({station.line.split('・')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Detailed Station Guide Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Main Station Hero Details Card */}
        <motion.div 
          key={currentStation.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8"
        >
          {/* Top Header of Selected Station */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#96723e] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentStation.city}</span>
                <span>•</span>
                <span>停車種別: {currentStation.expressStop}</span>
              </div>
              <h2 className="font-mincho text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                {currentStation.name}
                <span className="text-xs sm:text-sm font-normal text-slate-500 ml-3 font-sans">
                  （{currentStation.nameReading}）
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectStationProperties(currentStation.city.split('・')[0])}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#96723e]" />
                <span>この駅・地域の物件を見る</span>
              </button>
              <button
                onClick={() => onConsultClick(`${currentStation.name}周辺の不動産相談`)}
                className="px-4 py-2.5 rounded-xl bg-[#1e2638] hover:bg-[#28334a] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>無料査定・相談を予約</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c29d66]" />
              </button>
            </div>
          </div>

          {/* Station Overview Paragraph & Highlights */}
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {currentStation.overview}
            </p>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#96723e]" />
                <span>{currentStation.name}の注目ポイント</span>
              </div>
              <ul className="space-y-1.5">
                {currentStation.highlights.map((h, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grid: Travel Times & Market Prices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Travel Times */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#96723e]" />
                <span>主要ターミナル駅へのアクセス時間</span>
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                {currentStation.travelTimes.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200/80">
                    <span className="font-semibold text-slate-800">{item.destination}</span>
                    <span className="font-medium text-slate-600 font-mono">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Market Estimates */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-[#96723e]" />
                <span>最新の不動産相場目安（売買取引相場）</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="text-slate-500 text-[11px]">新築一戸建て</div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">{currentStation.priceMarket.newHouse}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="text-slate-500 text-[11px]">中古一戸建て</div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">{currentStation.priceMarket.usedHouse}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="text-slate-500 text-[11px]">土地坪単価目安</div>
                  <div className="font-bold text-[#96723e] text-xs sm:text-sm font-mono">{currentStation.priceMarket.landTsubo}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="text-slate-500 text-[11px]">中古マンション</div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">{currentStation.priceMarket.condo}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Living Facilities (Schools, Supermarkets, Parks, Hospitals) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              生活利便施設・子育て環境
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Supermarkets */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <ShoppingCart className="w-3.5 h-3.5 text-[#96723e]" />
                  <span>スーパー・商業施設</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {currentStation.facilities.supermarkets.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

              {/* Schools */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <School className="w-3.5 h-3.5 text-[#96723e]" />
                  <span>小中学校・学区</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {currentStation.facilities.schools.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

              {/* Parks */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                  <span>公園・自然レジャー</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {currentStation.facilities.parks.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

              {/* Hospitals */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Hospital className="w-3.5 h-3.5 text-rose-600" />
                  <span>医療機関・総合病院</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {currentStation.facilities.hospitals.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Expert Buying / Selling Advice from CTC */}
          <div className="bg-[#1e2638] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c29d66]" />
                <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
                  心誠不動産の地元プロ視点アドバイス
                </span>
              </div>
              <span className="text-[11px] text-[#c29d66]">埼玉西部・鶴ヶ島密着</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <div className="font-bold text-[#c29d66] flex items-center gap-1.5">
                  <Home className="w-4 h-4" />
                  <span>{currentStation.name}周辺で「家を買いたい方」へ</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {currentStation.advice.buying}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-bold text-[#c29d66] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>{currentStation.name}周辺で「不動産を売りたい方」へ</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {currentStation.advice.selling}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-end">
              <button
                onClick={() => onConsultClick(`${currentStation.name}の不動産売却・買取査定依頼`)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#96723e] to-[#b38a4d] hover:brightness-105 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>{currentStation.name}の無料査定・個別相談はこちら</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </motion.div>

        {/* All Stations Grid Overview (SEO Rich Linking) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-mincho text-xl font-bold text-slate-900">
              その他の東武東上線・埼玉主要駅一覧
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              気になる駅をクリックすると、各駅の相場や住環境データを確認できます。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STATIONS_DATA.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  setSelectedStationId(st.id);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedStationId === st.id
                    ? 'border-[#96723e] bg-amber-50/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{st.name}</span>
                  <span className="text-[11px] text-slate-500">{st.city}</span>
                </div>
                <div className="text-xs text-[#96723e] font-semibold mt-1">
                  {st.priceMarket.landTsubo}
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                  {st.overview}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
